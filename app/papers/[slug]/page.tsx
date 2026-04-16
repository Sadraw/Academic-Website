import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const filePath = path.join(
    process.cwd(),
    "content/papers",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return (
      <main>
        <h1>Paper not found</h1>
        <p>{filePath}</p>
      </main>
    );
  }

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
      <h1>{data.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: processed.toString() }} />
    </main>
  );
}