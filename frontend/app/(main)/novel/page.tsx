import NovelLibrary from "@/components/novel/NovelLibrary";
import { getNovelManifest } from "@/lib/novel";

export default async function NovelListPage() {
  const novels = await getNovelManifest();
  return <NovelLibrary novels={novels} />;
}
