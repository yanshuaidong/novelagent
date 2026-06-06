"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  SwitcherOutlined,
  UnorderedListOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

import { buildNovelPath } from "@/lib/novelPath";

import type { NovelMeta } from "./types";
import { DEFAULT_BG, DEFAULT_TEXT, themeForBg } from "./readingThemes";
import { useReaderStore } from "@/store/novelReader";
import NovelListDrawer from "./NovelListDrawer";
import ChapterListDrawer from "./ChapterListDrawer";
import ReaderSettingsDrawer from "./ReaderSettingsDrawer";
import { useReadingProgress } from "./useReadingProgress";

interface NovelReaderProps {
  novels: NovelMeta[];
  activeNovelId: string | null;
  activeChapterId: string | null;
  chapterTitle: string | null;
  chapterHtml: string;
}

type DrawerKey = "novel" | "chapter" | "settings" | null;

const DEFAULT_FONT_SIZE = 18;

export default function NovelReader({
  novels,
  activeNovelId,
  activeChapterId,
  chapterTitle,
  chapterHtml,
}: NovelReaderProps) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState<DrawerKey>(null);

  // 持久化设置只在客户端生效，挂载前用默认值，避免水合不一致
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const bgColor = useReaderStore((s) => s.bgColor);
  const fontSize = useReaderStore((s) => s.fontSize);

  const theme = themeForBg(bgColor);
  const appliedBg = mounted ? theme.bg : DEFAULT_BG;
  const appliedText = mounted ? theme.text : DEFAULT_TEXT;
  const appliedFontSize = mounted ? fontSize : DEFAULT_FONT_SIZE;

  const activeNovel = novels.find((n) => n.id === activeNovelId) ?? null;

  const scrollRef = useReadingProgress({
    activeNovelId,
    activeChapterId,
    ready: mounted && Boolean(activeChapterId && chapterHtml),
  });

  const navigate = (segments: string[]) => {
    router.push(buildNovelPath(segments));
  };

  const handleSelectNovel = (novelId: string) => {
    setOpenDrawer(null);
    navigate([novelId]);
  };

  const handleSelectChapter = (chapterId: string) => {
    setOpenDrawer(null);
    if (activeNovelId) navigate([activeNovelId, chapterId]);
  };

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto px-4 py-4 bg-[#e0e0e0]"
      >
        {activeChapterId ? (
          <article
            className="mx-auto max-w-[960px] px-10 py-10 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-colors duration-200"
            style={{ backgroundColor: appliedBg, color: appliedText }}
          >
            {activeNovel && (
              <p className="m-0 mb-2 text-center text-sm opacity-60">
                {activeNovel.title}
              </p>
            )}
            <h2
              className="m-0 mb-8 text-2xl font-semibold text-center pb-4 border-b"
              style={{ borderColor: appliedText }}
            >
              {chapterTitle}
            </h2>
            <div
              className="novel-content text-justify break-words"
              style={{ fontSize: appliedFontSize, lineHeight: 2 }}
              dangerouslySetInnerHTML={{ __html: chapterHtml }}
            />
          </article>
        ) : (
          <div className="mx-auto max-w-[960px] py-20 text-center text-[#909399]">
            <p className="mb-2">暂无小说内容。</p>
            <p className="text-sm">
              请在 <code>frontend/content</code>{" "}
              下创建「一个文件夹 = 一本小说，文件夹内每个 .md = 一章」。
            </p>
          </div>
        )}
      </div>

      {/* 竖向操作栏：右侧 16px、上下居中、宽 60px */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-[60px] flex flex-col items-center gap-1 py-2 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
        <ToolButton title="切换小说" onClick={() => setOpenDrawer("novel")}>
          <SwitcherOutlined />
        </ToolButton>
        <ToolButton title="目录" onClick={() => setOpenDrawer("chapter")}>
          <UnorderedListOutlined />
        </ToolButton>
        <ToolButton title="阅读设置" onClick={() => setOpenDrawer("settings")}>
          <SettingOutlined />
        </ToolButton>
      </div>

      <NovelListDrawer
        open={openDrawer === "novel"}
        onClose={() => setOpenDrawer(null)}
        novels={novels}
        activeNovelId={activeNovelId}
        onSelect={handleSelectNovel}
      />
      <ChapterListDrawer
        open={openDrawer === "chapter"}
        onClose={() => setOpenDrawer(null)}
        chapters={activeNovel?.chapters ?? []}
        activeChapterId={activeChapterId}
        onSelect={handleSelectChapter}
      />
      <ReaderSettingsDrawer
        open={openDrawer === "settings"}
        onClose={() => setOpenDrawer(null)}
      />
    </div>
  );
}

function ToolButton({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Tooltip title={title} placement="left">
      <button
        type="button"
        onClick={onClick}
        aria-label={title}
        className="w-11 h-11 flex items-center justify-center rounded-xl text-[#606266] hover:bg-[#f2f3f5] hover:text-[#409eff] text-xl cursor-pointer transition-colors"
      >
        {children}
      </button>
    </Tooltip>
  );
}
