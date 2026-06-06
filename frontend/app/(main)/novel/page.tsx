import { readFile } from "node:fs/promises";
import path from "node:path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export default async function NovelPage() {
  const source = await readFile(
    path.join(process.cwd(), "content", "第一章.md"),
    "utf-8"
  );
  const html = md.render(source);

  return (
    <article className="max-w-[900px] mx-auto px-10 py-8 bg-white rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <h2 className="m-0 mb-6 text-2xl font-semibold text-[#303133] text-center pb-4 border-b border-[#ebeef5]">
        第一章
      </h2>
      <div
        className="novel-content text-base leading-loose text-[#303133] text-justify break-all"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
