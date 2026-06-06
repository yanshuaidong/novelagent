"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { buildNovelPath } from "@/lib/novelPath";
import {
  getReadingProgress,
  saveReadingProgress,
} from "@/lib/readingProgress";

const SAVE_INTERVAL_MS = 60_000;

interface UseReadingProgressOptions {
  activeNovelId: string | null;
  activeChapterId: string | null;
  /** 章节正文渲染完成后为 true，用于恢复滚动位置 */
  ready: boolean;
}

/**
 * 阅读进度：每 1 分钟写入 localStorage；刷新或再次进入时恢复章节与滚动位置。
 */
export function useReadingProgress({
  activeNovelId,
  activeChapterId,
  ready,
}: UseReadingProgressOptions) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const restoredRef = useRef(false);
  /** 每本书仅做一次「跳转到上次章节」，避免手动换章后被拉回 */
  const initialRedirectNovelRef = useRef<string | null>(null);

  // 首次进入某本书时：若本地进度章节与当前不同，跳转到上次阅读的章节
  useEffect(() => {
    if (!activeNovelId || !activeChapterId) return;
    if (initialRedirectNovelRef.current === activeNovelId) return;
    initialRedirectNovelRef.current = activeNovelId;

    const saved = getReadingProgress(activeNovelId);
    if (!saved || saved.chapterId === activeChapterId) return;

    restoredRef.current = false;
    router.replace(buildNovelPath([activeNovelId, saved.chapterId]));
  }, [activeNovelId, activeChapterId, router]);

  // 章节就绪后恢复滚动位置（每章仅恢复一次）
  useEffect(() => {
    if (!ready || !activeNovelId || !activeChapterId || restoredRef.current)
      return;

    const saved = getReadingProgress(activeNovelId);
    if (!saved || saved.chapterId !== activeChapterId) {
      restoredRef.current = true;
      return;
    }

    const el = scrollRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = saved.scrollTop;
      restoredRef.current = true;
    });
  }, [ready, activeNovelId, activeChapterId]);

  // 切换章节时重置恢复标记
  useEffect(() => {
    restoredRef.current = false;
  }, [activeChapterId]);

  // 定时保存 + 离开页面前保存
  useEffect(() => {
    if (!activeNovelId || !activeChapterId) return;

    const persist = () => {
      const el = scrollRef.current;
      if (!el) return;
      saveReadingProgress(activeNovelId, activeChapterId, el.scrollTop);
    };

    const timer = window.setInterval(persist, SAVE_INTERVAL_MS);
    window.addEventListener("beforeunload", persist);

    return () => {
      persist();
      window.clearInterval(timer);
      window.removeEventListener("beforeunload", persist);
    };
  }, [activeNovelId, activeChapterId]);

  return scrollRef;
}
