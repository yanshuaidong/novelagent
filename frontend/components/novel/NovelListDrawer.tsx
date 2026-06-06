"use client";

import { Drawer } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import type { NovelMeta } from "./types";

interface NovelListDrawerProps {
  open: boolean;
  onClose: () => void;
  novels: NovelMeta[];
  activeNovelId: string | null;
  onSelect: (novelId: string) => void;
}

export default function NovelListDrawer({
  open,
  onClose,
  novels,
  activeNovelId,
  onSelect,
}: NovelListDrawerProps) {
  return (
    <Drawer title="切换小说" placement="right" size={320} open={open} onClose={onClose}>
      <div className="flex flex-col gap-1">
        {novels.length === 0 && <p className="text-[#909399]">暂无小说</p>}
        {novels.map((novel) => {
          const active = novel.id === activeNovelId;
          return (
            <button
              key={novel.id}
              type="button"
              onClick={() => onSelect(novel.id)}
              className={[
                "flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left cursor-pointer transition-colors",
                active
                  ? "bg-[#ecf5ff] text-[#409eff]"
                  : "text-[#303133] hover:bg-[#f5f7fa]",
              ].join(" ")}
            >
              <span className="truncate">{novel.title}</span>
              {active && <CheckOutlined className="shrink-0" />}
            </button>
          );
        })}
      </div>
    </Drawer>
  );
}
