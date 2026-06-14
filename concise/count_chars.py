#!/usr/bin/env python3
"""流式统计小说 txt 中的汉字数量（不整文件读入内存）。"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# CJK 统一汉字基本区
HAN_RE = re.compile(r"[\u4e00-\u9fff]")

DEFAULT_ROOT = Path(__file__).resolve().parent


def count_han_in_file(path: Path, chunk_size: int = 1 << 20) -> tuple[int, int, int]:
    """返回 (汉字数, 总字符数, 字节数)。"""
    han_count = 0
    char_count = 0
    byte_count = 0

    with path.open("r", encoding="utf-8", errors="replace") as f:
        while True:
            chunk = f.read(chunk_size)
            if not chunk:
                break
            han_count += len(HAN_RE.findall(chunk))
            char_count += len(chunk)
            byte_count += len(chunk.encode("utf-8"))

    return han_count, char_count, byte_count


def find_novels(root: Path) -> list[Path]:
    novels: list[Path] = []
    for sub in sorted(root.iterdir()):
        if sub.is_dir() and sub.name.startswith("doc"):
            for txt in sorted(sub.glob("*.txt")):
                novels.append(txt)
    return novels


def main() -> int:
    parser = argparse.ArgumentParser(description="统计小说 txt 中的汉字数量")
    parser.add_argument(
        "paths",
        nargs="*",
        type=Path,
        help="txt 文件或目录（默认扫描 concise/doc*/ 下所有 txt）",
    )
    args = parser.parse_args()

    if args.paths:
        files: list[Path] = []
        for p in args.paths:
            p = p.resolve()
            if p.is_dir():
                files.extend(sorted(p.glob("*.txt")))
            elif p.is_file():
                files.append(p)
            else:
                print(f"跳过不存在的路径: {p}", file=sys.stderr)
    else:
        files = find_novels(DEFAULT_ROOT)

    if not files:
        print("未找到 txt 文件。", file=sys.stderr)
        return 1

    print(f"{'文件':<40} {'汉字':>12} {'总字符':>12} {'大小(MB)':>10}")
    print("-" * 76)

    total_han = 0
    for path in files:
        han, chars, nbytes = count_han_in_file(path)
        total_han += han
        rel = path.relative_to(DEFAULT_ROOT) if path.is_relative_to(DEFAULT_ROOT) else path
        print(f"{str(rel):<40} {han:>12,} {chars:>12,} {nbytes / 1_048_576:>10.2f}")

    print("-" * 76)
    print(f"{'合计':<40} {total_han:>12,}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
