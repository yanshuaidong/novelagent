const STORAGE_KEY = "novel-reading-progress";

export interface ReadingProgress {
  chapterId: string;
  scrollTop: number;
  updatedAt: number;
}

type ProgressMap = Record<string, ReadingProgress>;

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

/** 读取某本书的阅读进度 */
export function getReadingProgress(novelId: string): ReadingProgress | null {
  return readAll()[novelId] ?? null;
}

/** 保存某本书的阅读进度（每本书仅保留一条，新记录覆盖旧记录） */
export function saveReadingProgress(
  novelId: string,
  chapterId: string,
  scrollTop: number
): void {
  const map = readAll();
  map[novelId] = { chapterId, scrollTop, updatedAt: Date.now() };
  writeAll(map);
}
