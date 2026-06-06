import CharacterGraph from "@/components/character/CharacterGraph";
import { DEFAULT_GRAPH_ID } from "@/components/character/CharacterGraph";

interface CharacterPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { slug } = await params;
  const graphId = slug?.[0] ?? DEFAULT_GRAPH_ID;

  return <CharacterGraph graphId={graphId} />;
}
