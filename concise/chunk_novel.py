#!/usr/bin/env python3
"""
将小说按汉字数（U+4E00-U+9FFF）切块，每块约 100,000 汉字，
输出到 chunks/ 目录，每块末尾尽量在段落边界断开。
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

# CJK 统一汉字基本区
HAN_RE = re.compile(r"[一-鿿]")

# 输出目录
CHUNK_DIR = Path(__file__).resolve().parent / "chunks"


def split_novel(filepath: Path, chunk_size: int = 100_000) -> list[Path]:
    """将小说按汉字数切块，返回 chunk 文件路径列表。"""
    CHUNK_DIR.mkdir(parents=True, exist_ok=True)

    # 清空旧 chunk
    for old in CHUNK_DIR.glob("chunk_*.txt"):
        old.unlink()

    stem = filepath.stem  # 文件名（不含扩展名）
    chunks: list[Path] = []

    han_count = 0  # 当前 chunk 内汉字数
    chunk_index = 1
    chunk_lines: list[str] = []

    def flush_chunk() -> Path:
        nonlocal han_count, chunk_index, chunk_lines
        out_path = CHUNK_DIR / f"chunk_{chunk_index:03d}.txt"
        with open(out_path, "w", encoding="utf-8") as f:
            f.writelines(chunk_lines)
        chunks.append(out_path)
        print(f"  [OK] 写入 {out_path.name}  ({han_count:,} 汉字)")
        chunk_index += 1
        han_count = 0
        chunk_lines = []
        return out_path

    print(f"正在切分: {filepath.name}")
    print(f"每块约 {chunk_size:,} 汉字\n")

    with open(filepath, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            # 计算本行汉字数
            line_han = len(HAN_RE.findall(line))

            # 如果当前块为空，直接加入
            if han_count == 0:
                chunk_lines.append(line)
                han_count += line_han
                continue

            # 如果加入本行会超过 chunk_size，且当前块不为空 → 先刷出当前块
            if han_count + line_han > chunk_size:
                flush_chunk()
                # 本行放入新的块
                chunk_lines.append(line)
                han_count += line_han
            else:
                chunk_lines.append(line)
                han_count += line_han

    # 最后一块
    if chunk_lines:
        flush_chunk()

    print(f"\n切分完成! 共 {len(chunks)} 个 chunk")
    return chunks


def main() -> int:
    parser = argparse.ArgumentParser(description="小说切块工具（按汉字数）")
    parser.add_argument(
        "filepath",
        type=Path,
        nargs="?",
        default=None,
        help="小说 txt 路径（默认 doc1/斗破苍穹.txt）",
    )
    parser.add_argument(
        "--chunk-size",
        type=int,
        default=100_000,
        help="每块汉字数（默认 100,000）",
    )
    parser.add_argument(
        "--list-chunks",
        action="store_true",
        help="仅列出已有 chunk，不重新切分",
    )

    args = parser.parse_args()

    if args.list_chunks:
        if not CHUNK_DIR.exists():
            print("chunks/ 目录不存在")
            return 1
        chunks = sorted(CHUNK_DIR.glob("chunk_*.txt"))
        if not chunks:
            print("chunks/ 目录为空")
            return 1
        for c in chunks:
            # 统计该 chunk 汉字数
            han = 0
            with open(c, "r", encoding="utf-8") as f:
                for line in f:
                    han += len(HAN_RE.findall(line))
            print(f"{c.name}  →  {han:,} 汉字")
        return 0

    if args.filepath is None:
        # 默认路径
        default = Path(__file__).resolve().parent / "doc1" / "斗破苍穹.txt"
        if not default.exists():
            print("请指定小说文件路径", file=sys.stderr)
            return 1
        args.filepath = default

    if not args.filepath.exists():
        print(f"文件不存在: {args.filepath}", file=sys.stderr)
        return 1

    split_novel(args.filepath.resolve(), args.chunk_size)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
