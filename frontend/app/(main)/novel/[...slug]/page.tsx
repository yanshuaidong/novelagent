import { redirect } from "next/navigation";

import NovelReader from "@/components/novel/NovelReader";
import { getChapterHtml, getNovelManifest } from "@/lib/novel";
import { buildNovelPath } from "@/lib/novelPath";

interface NovelPageProps {
  params: Promise<{ slug: string[] }>;
}

/** Next.js 有时会把 slug 保留为百分号编码，需先解码再与磁盘 id 比较 */
function decodeSegments(slug: string[]): string[] {
  return slug.map((seg) => {
    try {
      return decodeURIComponent(seg);
    } catch {
      return seg;
    }
  });
}

export default async function NovelReaderPage({ params }: NovelPageProps) {
  const { slug } = await params;
  const segments = decodeSegments(slug);
  const novels = await getNovelManifest();

  if (!segments[0]) redirect("/novel");

  const activeNovel = novels.find((n) => n.id === segments[0]) ?? null;
  if (!activeNovel) redirect("/novel");

  const activeChapter =
    activeNovel.chapters.find((c) => c.id === segments[1]) ??
    activeNovel.chapters[0] ??
    null;
  if (!activeChapter) redirect("/novel");

  // 规范化 URL：让地址栏始终精确指向「当前小说/当前章节」，刷新不跳章
  const needsRedirect =
    segments[0] !== activeNovel.id || segments[1] !== activeChapter.id;
  if (needsRedirect) redirect(buildNovelPath([activeNovel.id, activeChapter.id]));

  const chapterHtml = await getChapterHtml(activeNovel.id, activeChapter.id);

  return (
    <NovelReader
      novels={novels}
      activeNovelId={activeNovel.id}
      activeChapterId={activeChapter.id}
      chapterTitle={activeChapter.title}
      chapterHtml={chapterHtml}
    />
  );
}
