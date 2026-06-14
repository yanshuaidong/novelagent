#!/usr/bin/env python3
"""检查所有chunk文件信息"""
import os, re

HAN_RE = re.compile(r"[一-鿿]")
chunks_dir = r"D:/ysd/novelagent/concise/chunks"

for i in range(1, 48):
    path = os.path.join(chunks_dir, f"chunk_{i:03d}.txt")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        han = len(HAN_RE.findall(content))
        total = len(content)
        print(f"chunk_{i:03d}: {han:>7,} 汉字 / {total:>7,} 总字符")
    else:
        print(f"chunk_{i:03d}: 不存在")
