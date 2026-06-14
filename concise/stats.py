import os, re
d = r"D:/ysd/novelagent/concise"
total_chars = 0
count = 0
for i in range(1, 48):
    path = os.path.join(d, f"剧情{i}.md")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        chars = len(content.strip())
        total_chars += chars
        count += 1
print(f"总文件数: {count}个")
print(f"总字数: {total_chars:,} 字符")
print(f"平均: {total_chars//count:,} 字符/篇")
