import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { DEFAULT_BG } from "@/components/novel/readingThemes";

interface ReaderState {
  /** 阅读背景色（与 readingThemes 中的预设对应） */
  bgColor: string;
  /** 正文字号 px */
  fontSize: number;
  setBgColor: (color: string) => void;
  setFontSize: (size: number) => void;
}

/** 兼容 SSR 的 storage：服务端不访问 localStorage */
const safeStorage = {
  getItem: (key: string) =>
    typeof window !== "undefined" ? window.localStorage.getItem(key) : null,
  setItem: (key: string, value: string) => {
    if (typeof window !== "undefined") window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window !== "undefined") window.localStorage.removeItem(key);
  },
};

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      bgColor: DEFAULT_BG,
      fontSize: 18,
      setBgColor: (bgColor) => set({ bgColor }),
      setFontSize: (fontSize) => set({ fontSize }),
    }),
    {
      name: "novel-reader-settings",
      storage: createJSONStorage(() => safeStorage),
    }
  )
);
