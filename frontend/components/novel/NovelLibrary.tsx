"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { buildNovelPath } from "@/lib/novelPath";
import { getReadingProgress } from "@/lib/readingProgress";

import type { NovelMeta } from "./types";

interface NovelLibraryProps {
  novels: NovelMeta[];
}

/** 客户端挂载后再读 localStorage，避免 SSR 水合不一致 */
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function novelHref(novel: NovelMeta, mounted: boolean): string {
  if (!mounted) return buildNovelPath([novel.id]);

  const saved = getReadingProgress(novel.id);
  const chapterId =
    saved?.chapterId &&
    novel.chapters.some((c) => c.id === saved.chapterId)
      ? saved.chapterId
      : novel.chapters[0]?.id;

  return chapterId
    ? buildNovelPath([novel.id, chapterId])
    : buildNovelPath([novel.id]);
}

export default function NovelLibrary({ novels }: NovelLibraryProps) {
  const mounted = useMounted();
  return (
    <div className="mx-auto max-w-[1200px]">
      <header className="mb-8">
        <h1 className="m-0 text-2xl font-semibold text-[#303133]">书库</h1>
        <p className="mt-1.5 mb-0 text-sm text-[#909399]">
          选择一本小说开始阅读
        </p>
      </header>

      {novels.length === 0 ? (
        <div className="py-20 text-center text-[#909399]">
          <p className="mb-2">暂无小说内容。</p>
          <p className="text-sm">
            请在 <code>frontend/content</code>{" "}
            下创建「一个文件夹 = 一本小说，文件夹内每个 .md = 一章」。
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {novels.map((novel) => (
            <Link
              key={novel.id}
              href={novelHref(novel, mounted)}
              className="group block rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#ecf5ff] text-lg font-semibold text-[#409eff]">
                {novel.title.slice(0, 1)}
              </div>
              <h2 className="m-0 mb-1.5 text-lg font-semibold text-[#303133] transition-colors group-hover:text-[#409eff]">
                {novel.title}
              </h2>
              <p className="m-0 text-sm text-[#909399]">
                共 {novel.chapters.length} 章
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
