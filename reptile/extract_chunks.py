#!/usr/bin/env python3
"""将 前1000章.md 按 10 万字（不含空白）切分为块，供后续总结使用。"""
import json
import re
from pathlib import Path

BASE = Path(__file__).parent
SOURCE = BASE / "前1000章.md"
CHUNKS_DIR = BASE / "chunks"
MANIFEST = BASE / "chunks_manifest.json"
CHUNK_SIZE = 100_000  # 每块正文字数（不含空白）


def chars_no_ws(s: str) -> int:
    return len(re.sub(r"\s", "", s))


def find_chapter_positions(text: str) -> list[tuple[int, str]]:
    """返回 [(起始位置, 章节标题), ...]"""
    pattern = re.compile(r"^## (第\d+章[^\n]*)", re.MULTILINE)
    return [(m.start(), m.group(1)) for m in pattern.finditer(text)]


def split_at_chapter(text: str, target_pos: int, chapters: list[tuple[int, str]]) -> int:
    """在 target_pos 附近找最近的章节边界（优先不超过 target 的章节起点）。"""
    best = 0
    for pos, _ in chapters:
        if pos <= target_pos and pos > best:
            best = pos
    return best if best > 0 else target_pos


def extract_chunks(text: str, chunk_size: int = CHUNK_SIZE) -> list[dict]:
    chapters = find_chapter_positions(text)
    chunks: list[dict] = []
    start = 0
    idx = 1

    while start < len(text):
        # 累计不含空白字符，找到 chunk 结束位置
        count = 0
        end = start
        while end < len(text) and count < chunk_size:
            ch = text[end]
            if not ch.isspace():
                count += 1
            end += 1

        # 非最后一块：尝试在章节边界切分
        if end < len(text) and count >= chunk_size:
            split_pos = split_at_chapter(text, end, chapters)
            if split_pos > start:
                end = split_pos

        chunk_text = text[start:end].strip()
        if not chunk_text:
            break

        # 统计本块涵盖的章节
        chunk_chapters = [
            title for pos, title in chapters if start <= pos < end
        ]

        chunks.append(
            {
                "index": idx,
                "start": start,
                "end": end,
                "chars_no_ws": chars_no_ws(chunk_text),
                "chapters": chunk_chapters,
                "first_chapter": chunk_chapters[0] if chunk_chapters else None,
                "last_chapter": chunk_chapters[-1] if chunk_chapters else None,
                "output_file": f"总结{idx}.md",
                "chunk_file": f"chunk_{idx:02d}.md",
            }
        )
        start = end
        idx += 1

    return chunks


def main():
    text = SOURCE.read_text(encoding="utf-8")
    chunks = extract_chunks(text)

    CHUNKS_DIR.mkdir(exist_ok=True)

    for c in chunks:
        chunk_text = text[c["start"] : c["end"]].strip()
        chunk_path = CHUNKS_DIR / c["chunk_file"]
        chunk_path.write_text(chunk_text, encoding="utf-8")
        print(
            f"块 {c['index']:2d}: {c['chars_no_ws']:,} 字 | "
            f"{c['first_chapter'] or '?'} ~ {c['last_chapter'] or '?'} -> {c['chunk_file']}"
        )

    manifest = {
        "source": str(SOURCE.name),
        "total_chars_no_ws": chars_no_ws(text),
        "chunk_size": CHUNK_SIZE,
        "total_chunks": len(chunks),
        "target_summary_chars": 10_000,
        "chunks": chunks,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n共 {len(chunks)} 块，manifest 已写入 {MANIFEST}")


if __name__ == "__main__":
    main()
