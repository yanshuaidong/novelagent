#!/usr/bin/env python3
"""高并发爬取 boquge 小说全文章节，合并写入 txt"""

from __future__ import annotations

import argparse
import asyncio
import html
import re
import sys
import time
from dataclasses import dataclass
from pathlib import Path

import aiohttp

BASE_URL = "https://m.boquge.com"
DEFAULT_DIR = Path(__file__).resolve().parent

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Referer": f"{BASE_URL}/",
}

TITLE_RE = re.compile(r"<h1>([^<]+)</h1>")
CONTENT_RE = re.compile(r'<div id="cContent">(.*?)</div>', re.DOTALL)
P_RE = re.compile(r"<p>(.*?)</p>", re.DOTALL)
TAG_RE = re.compile(r"<[^>]+>")


@dataclass(frozen=True)
class ChapterMeta:
    chapter_id: str
    title: str
    url: str


@dataclass
class ChapterContent:
    meta: ChapterMeta
    text: str
    ok: bool = True
    error: str = ""


def make_patterns(book_id: int) -> tuple[re.Pattern[str], re.Pattern[str]]:
    tail_page_re = re.compile(rf'href="{book_id}-(\d+)\.html"\s+class="btn_c">尾页</a>')
    chapter_link_re = re.compile(rf'href="/wapbook/{book_id}_(\d+)\.html">([^<]+)</a>')
    return tail_page_re, chapter_link_re


def strip_html(text: str) -> str:
    text = TAG_RE.sub("", text)
    text = html.unescape(text).replace("\xa0", " ").strip()
    return text


def parse_chapter_html(html_text: str) -> tuple[str, str]:
    title_m = TITLE_RE.search(html_text)
    title = strip_html(title_m.group(1)) if title_m else "未知章节"

    content_m = CONTENT_RE.search(html_text)
    if not content_m:
        return title, ""

    paragraphs = [
        strip_html(p)
        for p in P_RE.findall(content_m.group(1))
        if strip_html(p)
    ]
    return title, "\n".join(paragraphs)


def parse_chapter_links(
    html_text: str,
    book_id: int,
    chapter_link_re: re.Pattern[str],
) -> list[ChapterMeta]:
    seen: set[str] = set()
    chapters: list[ChapterMeta] = []
    for chapter_id, title in chapter_link_re.findall(html_text):
        if chapter_id in seen:
            continue
        seen.add(chapter_id)
        chapters.append(
            ChapterMeta(
                chapter_id=chapter_id,
                title=strip_html(title),
                url=f"{BASE_URL}/wapbook/{book_id}_{chapter_id}.html",
            )
        )
    return chapters


async def fetch_text(
    session: aiohttp.ClientSession,
    url: str,
    sem: asyncio.Semaphore,
    retries: int = 5,
) -> str:
    last_error: BaseException | None = None
    for attempt in range(1, retries + 1):
        async with sem:
            try:
                async with session.get(
                    url,
                    headers=HEADERS,
                    timeout=aiohttp.ClientTimeout(total=45, connect=15, sock_read=45),
                ) as resp:
                    resp.raise_for_status()
                    raw = await resp.read()
                try:
                    return raw.decode("gbk")
                except UnicodeDecodeError:
                    return raw.decode("utf-8", errors="replace")
            except (asyncio.TimeoutError, aiohttp.ClientError, OSError) as exc:
                last_error = exc
                if attempt < retries:
                    await asyncio.sleep(0.8 * attempt)
            except asyncio.CancelledError:
                raise
            except Exception as exc:  # noqa: BLE001
                last_error = exc
                if attempt < retries:
                    await asyncio.sleep(0.8 * attempt)
    raise RuntimeError(f"请求失败: {url}") from last_error


async def discover_list_page_count(
    session: aiohttp.ClientSession,
    sem: asyncio.Semaphore,
    book_id: int,
    tail_page_re: re.Pattern[str],
) -> int:
    url = f"{BASE_URL}/wapbook/{book_id}-1.html"
    html_text = await fetch_text(session, url, sem)
    match = tail_page_re.search(html_text)
    if match:
        return int(match.group(1))
    raise RuntimeError(f"无法探测列表页总数: {url}")


async def fetch_catalog(
    session: aiohttp.ClientSession,
    sem: asyncio.Semaphore,
    book_id: int,
    chapter_link_re: re.Pattern[str],
    list_start: int,
    list_end: int,
) -> list[ChapterMeta]:
    urls = [
        f"{BASE_URL}/wapbook/{book_id}-{page}.html"
        for page in range(list_start, list_end + 1)
    ]
    tasks = [fetch_text(session, url, sem) for url in urls]
    pages = await asyncio.gather(*tasks, return_exceptions=True)

    seen: set[str] = set()
    chapters: list[ChapterMeta] = []
    failed = 0

    for page_no, result in enumerate(pages, start=list_start):
        if isinstance(result, Exception):
            failed += 1
            print(f"[目录] 第 {page_no} 页失败: {result}", file=sys.stderr)
            continue
        for meta in parse_chapter_links(result, book_id, chapter_link_re):
            if meta.chapter_id not in seen:
                seen.add(meta.chapter_id)
                chapters.append(meta)

    if failed:
        print(f"[目录] {failed} 个列表页失败", file=sys.stderr)
    return chapters


async def fetch_one_chapter(
    session: aiohttp.ClientSession,
    sem: asyncio.Semaphore,
    meta: ChapterMeta,
) -> ChapterContent:
    try:
        html_text = await fetch_text(session, meta.url, sem)
        title, text = parse_chapter_html(html_text)
        if not text:
            return ChapterContent(meta=meta, text="", ok=False, error="正文为空")
        if title != "未知章节":
            meta = ChapterMeta(meta.chapter_id, title, meta.url)
        return ChapterContent(meta=meta, text=text, ok=True)
    except asyncio.CancelledError:
        raise
    except BaseException as exc:  # noqa: BLE001
        return ChapterContent(meta=meta, text="", ok=False, error=str(exc))


async def fetch_all_chapters(
    session: aiohttp.ClientSession,
    sem: asyncio.Semaphore,
    chapters: list[ChapterMeta],
    progress_every: int = 50,
) -> list[ChapterContent]:
    total = len(chapters)
    done = 0
    results: list[ChapterContent | None] = [None] * total

    async def worker(index: int, meta: ChapterMeta) -> None:
        nonlocal done
        results[index] = await fetch_one_chapter(session, sem, meta)
        done += 1
        if done % progress_every == 0 or done == total:
            ok = sum(1 for r in results[:done] if r and r.ok)
            print(f"[章节] {done}/{total} 完成，成功 {ok}")

    await asyncio.gather(
        *(worker(i, meta) for i, meta in enumerate(chapters)),
        return_exceptions=True,
    )
    return [r for r in results if r is not None]


def write_novel(output_path: Path, chapters: list[ChapterContent]) -> None:
    parts: list[str] = []
    for item in chapters:
        if not item.ok:
            continue
        parts.append(item.meta.title)
        parts.append("")
        parts.append(item.text)
        parts.append("")
        parts.append("")

    output_path.write_text("\n".join(parts).rstrip() + "\n", encoding="utf-8")


async def run(
    book_id: int,
    output_path: Path,
    workers: int,
    list_start: int,
    list_end: int | None,
) -> None:
    tail_page_re, chapter_link_re = make_patterns(book_id)
    connector = aiohttp.TCPConnector(limit=workers, ttl_dns_cache=300, force_close=True)
    timeout = aiohttp.ClientTimeout(total=60, connect=15, sock_read=45)
    sem = asyncio.Semaphore(workers)

    t0 = time.perf_counter()

    async with aiohttp.ClientSession(connector=connector, timeout=timeout) as session:
        if list_end is None:
            print("[目录] 探测总页数 ...")
            list_end = await discover_list_page_count(session, sem, book_id, tail_page_re)
            print(f"[目录] 共 {list_end} 个列表页")

        print(f"[目录] 并发抓取列表页 {list_start}-{list_end} ...")
        catalog = await fetch_catalog(
            session, sem, book_id, chapter_link_re, list_start, list_end
        )
        print(f"[目录] 共 {len(catalog)} 章")

        print(f"[章节] 并发 {workers} 下载正文 ...")
        contents = await fetch_all_chapters(session, sem, catalog)

        failed_items = [c for c in contents if not c.ok]
        if failed_items:
            print(f"[章节] 重试 {len(failed_items)} 个失败章节 ...")
            retry_results = await asyncio.gather(
                *(fetch_one_chapter(session, sem, c.meta) for c in failed_items),
                return_exceptions=True,
            )
            by_id = {c.meta.chapter_id: c for c in contents}
            for old, new in zip(failed_items, retry_results):
                if isinstance(new, ChapterContent) and new.ok:
                    by_id[old.meta.chapter_id] = new
            contents = [by_id[c.chapter_id] for c in catalog if c.chapter_id in by_id]

    ok_items = [c for c in contents if c.ok]
    failed_items = [c for c in contents if not c.ok]

    print(f"[写入] 合并 {len(ok_items)} 章 -> {output_path}")
    write_novel(output_path, ok_items)

    elapsed = time.perf_counter() - t0
    print("\n完成")
    print(f"  成功: {len(ok_items)}")
    print(f"  失败: {len(failed_items)}")
    print(f"  耗时: {elapsed:.1f}s")
    print(f"  输出: {output_path}")

    if failed_items:
        fail_log = output_path.with_suffix(".failed.txt")
        lines = [f"{c.meta.title}\t{c.meta.url}\t{c.error}" for c in failed_items]
        fail_log.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"  失败记录: {fail_log}")


def main() -> None:
    parser = argparse.ArgumentParser(description="高并发爬取 boquge 小说全文")
    parser.add_argument("--book-id", type=int, required=True, help="书籍 ID，如 46773、1666")
    parser.add_argument(
        "--output",
        type=Path,
        required=True,
        help="输出 txt 路径",
    )
    parser.add_argument("--workers", type=int, default=48, help="并发数，默认 48")
    parser.add_argument("--list-start", type=int, default=1, help="列表页起始页")
    parser.add_argument(
        "--list-end",
        type=int,
        default=None,
        help="列表页结束页，默认自动探测",
    )
    args = parser.parse_args()

    asyncio.run(
        run(
            book_id=args.book_id,
            output_path=args.output,
            workers=args.workers,
            list_start=args.list_start,
            list_end=args.list_end,
        )
    )


if __name__ == "__main__":
    main()
