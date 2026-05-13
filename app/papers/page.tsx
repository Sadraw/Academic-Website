import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Navbar } from "../components/Navbar";
import { PapersViewer } from "../components/PapersAnimatedWrapper";
import { LeafBackground } from "../components/LeafBackground";


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
      pdf: data.pdf,
    };
  });

  papers.sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <main className="
      min-h-screen w-full
      px-8 py-20
      bg-[#98A869] dark:bg-zinc-900
      transition-colors duration-500
      font-serif text-center
    ">
        <LeafBackground />

      
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

        <PapersViewer papers={papers} />
      </div>
    </main>
  );
}