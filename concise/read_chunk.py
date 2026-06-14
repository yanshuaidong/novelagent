#!/usr/bin/env python3
"""
按索引读取切好的 chunk 文件内容。
用法: python read_chunk.py <索引>
      python read_chunk.py --info   # 显示 chunk 总数
"""
from __future__ import annotations

import sys
from pathlib import Path

CHUNK_DIR = Path(__file__).resolve().parent / "chunks"


def chunk_count() -> int:
    """返回 chunk 文件总数。"""
    return len(list(CHUNK_DIR.glob("chunk_*.txt")))


def read_chunk(index: int) -> str:
    """读取第 index 个 chunk（1-based）。"""
    path = CHUNK_DIR / f"chunk_{index:03d}.txt"
    if not path.exists():
        raise FileNotFoundError(f"chunk {index} 不存在: {path}")
    return path.read_text(encoding="utf-8")


def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1] in ("-h", "--help"):
        print("用法: python read_chunk.py <索引 (1-based)>")
        print("      python read_chunk.py --info")
        return 0

    if sys.argv[1] == "--info":
        total = chunk_count()
        print(f"chunks 总数: {total}")
        print(f"chunks 目录: {CHUNK_DIR}")
        return 0

    try:
        idx = int(sys.argv[1])
        content = read_chunk(idx)
        sys.stdout.write(content)
        return 0
    except (ValueError, FileNotFoundError) as e:
        print(f"错误: {e}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
