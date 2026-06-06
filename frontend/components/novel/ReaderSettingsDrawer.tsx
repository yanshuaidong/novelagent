"use client";

import { Drawer, Slider } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { READING_THEMES } from "./readingThemes";
import { useReaderStore } from "@/store/novelReader";

interface ReaderSettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function ReaderSettingsDrawer({
  open,
  onClose,
}: ReaderSettingsDrawerProps) {
  const bgColor = useReaderStore((s) => s.bgColor);
  const fontSize = useReaderStore((s) => s.fontSize);
  const setBgColor = useReaderStore((s) => s.setBgColor);
  const setFontSize = useReaderStore((s) => s.setFontSize);

  return (
    <Drawer title="阅读设置" placement="right" size={320} open={open} onClose={onClose}>
      <div className="mb-8">
        <div className="mb-3 text-sm font-medium text-[#303133]">背景颜色</div>
        <div className="flex gap-3">
          {READING_THEMES.map((theme) => {
            const active = theme.bg === bgColor;
            return (
              <button
                key={theme.key}
                type="button"
                title={theme.name}
                onClick={() => setBgColor(theme.bg)}
                className={[
                  "w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-shadow",
                  active
                    ? "border-2 border-[#409eff]"
                    : "border border-[#dcdfe6]",
                ].join(" ")}
                style={{ backgroundColor: theme.bg }}
              >
                {active && <CheckOutlined style={{ color: theme.text }} />}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between text-sm font-medium text-[#303133]">
          <span>字体大小</span>
          <span className="text-[#409eff]">{fontSize}px</span>
        </div>
        <Slider
          min={14}
          max={30}
          step={1}
          value={fontSize}
          onChange={setFontSize}
        />
      </div>
    </Drawer>
  );
}
