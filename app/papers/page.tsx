import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { PageFade, PaperFade } from "../components/PapersAnimatedWrapper";

export default function PapersPage() {
  const dir = path.join(process.cwd(), "content/papers");
  const files = fs.readdirSync(dir);

  const papers = files.map((file) => {
    const slug = file.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(dir, file), "utf8");
    const { data } = matter(fileContent);
    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      year: data.year,
      status: data.status,
    };
  });

  papers.sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <>
      <PageFade>
        {/* ── Main content ── */}
        <main
          className="
            min-h-screen w-full
            px-8 py-20
            bg-[#98A869] dark:bg-zinc-900
            transition-colors duration-500
            font-serif text-center
          "
        >
          {/* 🔝 NAVBAR */}
          <div className="mt-5">
            <Navbar />
          </div>

          <div className="flex flex-col items-center">

            <h1 className="text-[2.4rem] tracking-[1px] mt-5 mb-5">
              <Link href="/" className="text-[#1F2520] dark:text-zinc-100 no-underline hover:opacity-65 transition">
                &larr; Publications
              </Link>
            </h1>

            <p className="text-[1rem] tracking-wide leading-relaxed text-[#383737] dark:text-zinc-300 relative group overflow-hidden cursor-default inline-block">
              <span className="relative z-10">Research · Discourse · Digital Culture · Language</span>
              <span className="pointer-events-none absolute left-0 top-1/2 h-[45%] w-full -translate-y-1/2 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent blur-sm opacity-10 group-hover:opacity-40 group-hover:translate-x-full transition-all duration-1000 ease-out" />
            </p>

            <div className="mt-5 mb-0 w-24 border-t border-[#1F2520]/25 dark:border-zinc-600" />

            <div className="mt-1 w-full max-w-2xl flex flex-col">
              {papers.map((paper, i) => (
                <PaperFade key={paper.slug} i={i}>
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="group block py-6 border-b border-[#1F2520]/15 dark:border-zinc-700/50 last:border-b-0 transition-all duration-300 hover:opacity-75"
                  >
                    <span className="inline-block mb-2 text-[0.7rem] uppercase tracking-[0.3em] text-[#1F2520]/45 dark:text-zinc-500 font-sans">
                      {paper.year}
                      {paper.status && (
                        <><span className="mx-2 opacity-40">·</span><span>{paper.status}</span></>
                      )}
                    </span>

                    <h2 className="text-[1.55rem] leading-snug tracking-[0.2px] text-[#1F2520] dark:text-zinc-100 group-hover:text-[#1F2520]/80 dark:group-hover:text-zinc-200 transition-colors duration-200">
                      {paper.title}
                    </h2>

                    <p className="mt-1.5 text-[0.97rem] leading-relaxed tracking-wide text-[#383737]/80 dark:text-zinc-400 max-w-xl mx-auto">
                      {paper.excerpt}
                    </p>

                    <span className="inline-block mt-2 text-[0.78rem] font-sans tracking-wide text-[#1F2520]/35 dark:text-zinc-600 group-hover:text-[#1F2520]/60 dark:group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-200">
                      Read →
                    </span>
                  </Link>
                </PaperFade>
              ))}
            </div>

            <p className="mt-14 text-[0.72rem] uppercase tracking-[0.3em] text-[#1F2520]/30 dark:text-zinc-600 font-sans">
              {papers.length} publication{papers.length !== 1 ? "s" : ""}
            </p>

          </div>
        </main>
      </PageFade>
    </>
  );
}