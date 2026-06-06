"use client";

import { Drawer } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import type { ChapterMeta } from "./types";

interface ChapterListDrawerProps {
  open: boolean;
  onClose: () => void;
  chapters: ChapterMeta[];
  activeChapterId: string | null;
  onSelect: (chapterId: string) => void;
}

export default function ChapterListDrawer({
  open,
  onClose,
  chapters,
  activeChapterId,
  onSelect,
}: ChapterListDrawerProps) {
  return (
    <Drawer title="目录" placement="right" size={320} open={open} onClose={onClose}>
      <div className="flex flex-col gap-1">
        {chapters.length === 0 && <p className="text-[#909399]">暂无章节</p>}
        {chapters.map((chapter) => {
          const active = chapter.id === activeChapterId;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => onSelect(chapter.id)}
              className={[
                "flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left cursor-pointer transition-colors",
                active
                  ? "bg-[#ecf5ff] text-[#409eff]"
                  : "text-[#303133] hover:bg-[#f5f7fa]",
              ].join(" ")}
            >
              <span className="truncate">{chapter.title}</span>
              {active && <CheckOutlined className="shrink-0" />}
            </button>
          );
        })}
      </div>
    </Drawer>
  );
}
