#!/usr/bin/env python3
"""总结流水线：读取 manifest，显示进度，辅助逐块总结。"""
import json
import re
from pathlib import Path

BASE = Path(__file__).parent
MANIFEST = BASE / "chunks_manifest.json"
PROMPT = BASE / "SUMMARIZE_PROMPT.md"


def chars_no_ws(s: str) -> int:
    return len(re.sub(r"\s", "", s))


def status_report() -> dict:
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    done, pending = [], []
    for c in data["chunks"]:
        out = BASE / c["output_file"]
        if out.exists() and out.stat().st_size > 100:
            n = chars_no_ws(out.read_text(encoding="utf-8"))
            done.append({**c, "summary_chars": n})
        else:
            pending.append(c)
    return {
        "total": data["total_chunks"],
        "done": len(done),
        "pending": len(pending),
        "done_list": done,
        "pending_list": pending,
    }


def print_status():
    s = status_report()
    print(f"进度: {s['done']}/{s['total']} 块已完成\n")
    if s["done_list"]:
        print("已完成:")
        for c in s["done_list"]:
            print(
                f"  总结{c['index']:2d}.md  {c['summary_chars']:,} 字  "
                f"({c['first_chapter']} ~ {c['last_chapter']})"
            )
    if s["pending_list"]:
        print("\n待处理:")
        for c in s["pending_list"]:
            print(
                f"  块 {c['index']:2d}  chunk_{c['index']:02d}.md -> 总结{c['index']}.md  "
                f"({c['chars_no_ws']:,} 字, {c['first_chapter']} ~ {c['last_chapter']})"
            )


def next_pending() -> dict | None:
    s = status_report()
    return s["pending_list"][0] if s["pending_list"] else None


def agent_prompt_for(chunk_index: int) -> str:
    """生成给 Cursor 子 agent 的任务描述。"""
    data = json.loads(MANIFEST.read_text(encoding="utf-8"))
    c = next(x for x in data["chunks"] if x["index"] == chunk_index)
    prompt = PROMPT.read_text(encoding="utf-8")
    return f"""请为《全职法师》前1000章生成第 {chunk_index} 块的故事总结。

## 任务
- 阅读 `reptile/chunks/{c['chunk_file']}`（约 {c['chars_no_ws']:,} 字）
- 参考 `reptile/信息.md` 了解全书规模
- 参考 `reptile/SUMMARIZE_PROMPT.md` 的输出规范
- 参考 `frontend/content/回到明朝当王爷/总结1.md` 的格式风格
- 将约 10,000 字的总结写入 `reptile/总结{chunk_index}.md`

## 本块信息
- 块序号: {chunk_index}/{data['total_chunks']}
- 章节范围: {c['first_chapter']} ~ {c['last_chapter']}
- 源文件: reptile/chunks/{c['chunk_file']}
- 输出文件: reptile/总结{chunk_index}.md

## 提示词摘要
{prompt}
"""


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "prompt":
        idx = int(sys.argv[2]) if len(sys.argv) > 2 else (next_pending() or {}).get("index", 1)
        print(agent_prompt_for(idx))
    else:
        print_status()
        n = next_pending()
        if n:
            print(f"\n下一块: 总结{n['index']}.md")
            print(f"生成 prompt: python run_summarize.py prompt {n['index']}")
