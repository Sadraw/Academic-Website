import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function PaperPage({ params }: any) {
  const filePath = path.join(
    process.cwd(),
    "app/content/papers",
    `${params.slug}.md`
  );

  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  const processed = await remark().use(html).process(content);

  return (
    <main
      style={{
        maxWidth: "750px",
        margin: "0 auto",
        padding: "4rem 1.5rem",
        fontFamily: "serif",
        lineHeight: "1.8",
      }}
    >
      {/* 👇 THIS is your Markdown title */}
      <h1>{data.title}</h1>

      {/* Markdown body */}
      <div
        style={{ marginTop: "2rem" }}
        dangerouslySetInnerHTML={{
          __html: processed.toString(),
        }}
      />
    </main>
  );
}