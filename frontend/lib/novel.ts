import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import MarkdownIt from "markdown-it";

import type { NovelMeta } from "@/components/novel/types";

// breaks: true 让单个换行也渲染为 <br>，适配按行排版的古籍原文
const md = new MarkdownIt({ breaks: true });

/** 资源根目录：content 下「一个文件夹 = 一本小说，文件夹内每个 .md = 一章」 */
const CONTENT_DIR = path.join(process.cwd(), "content");

function stripMdExt(name: string): string {
  return name.replace(/\.md$/i, "");
}

/** 中文 / 数字混排的自然排序，保证“第一章、第二章…”顺序合理 */
function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, "zh-Hans-CN", { numeric: true });
}

/** 章节排序键：取文件名里的第一个数字（如 001），无数字则排到最后 */
function chapterOrder(id: string): number {
  const m = id.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : Number.MAX_SAFE_INTEGER;
}

/** 扫描 content 目录，构建全部小说与章节清单（不含正文） */
export async function getNovelManifest(): Promise<NovelMeta[]> {
  let entries;
  try {
    entries = await readdir(CONTENT_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const novels: NovelMeta[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    let files: string[] = [];
    try {
      files = await readdir(path.join(CONTENT_DIR, entry.name));
    } catch {
      files = [];
    }

    const chapters = files
      .filter((f) => f.toLowerCase().endsWith(".md"))
      .map((f) => stripMdExt(f))
      .sort((a, b) => {
        const oa = chapterOrder(a);
        const ob = chapterOrder(b);
        if (oa !== ob) return oa - ob;
        return naturalCompare(a, b);
      })
      .map((id) => ({ id, title: id }));

    // 仅把「至少含一个 .md 章节」的文件夹视为小说，忽略原始资料等无关目录
    if (chapters.length === 0) continue;

    novels.push({ id: entry.name, title: entry.name, chapters });
  }

  novels.sort((a, b) => naturalCompare(a.title, b.title));
  return novels;
}

/** 读取并渲染指定章节的 HTML */
export async function getChapterHtml(
  novelId: string,
  chapterId: string
): Promise<string> {
  const filePath = path.join(CONTENT_DIR, novelId, `${chapterId}.md`);
  const source = await readFile(filePath, "utf-8");
  return md.render(source);
}
