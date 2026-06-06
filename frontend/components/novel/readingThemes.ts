/** 阅读背景主题：背景色与对应正文颜色成对出现，保证可读性 */
export interface ReadingTheme {
  key: string;
  name: string;
  bg: string;
  text: string;
}

export const READING_THEMES: ReadingTheme[] = [
  { key: "white", name: "白", bg: "#ffffff", text: "#303133" },
  { key: "sepia", name: "米黄", bg: "#f5efdc", text: "#3a3326" },
  { key: "green", name: "护眼", bg: "#cce8cf", text: "#2a3a2c" },
  { key: "dark", name: "夜间", bg: "#1c1c1e", text: "#c7c7cc" },
];

export const DEFAULT_BG = READING_THEMES[0].bg;
export const DEFAULT_TEXT = READING_THEMES[0].text;

export function themeForBg(bg: string): ReadingTheme {
  return READING_THEMES.find((t) => t.bg === bg) ?? READING_THEMES[0];
}
