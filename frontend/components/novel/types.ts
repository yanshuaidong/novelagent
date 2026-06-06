/** 章节元信息（不含正文，仅用于目录展示） */
export interface ChapterMeta {
  id: string;
  title: string;
}

/** 小说元信息（含章节清单） */
export interface NovelMeta {
  id: string;
  title: string;
  chapters: ChapterMeta[];
}
