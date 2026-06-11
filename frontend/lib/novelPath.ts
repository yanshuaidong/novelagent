/** 构建小说阅读页路径（各段自动 URL 编码） */
export function buildNovelPath(segments: string[]): string {
  return "/novel/" + segments.map(encodeURIComponent).join("/");
}
