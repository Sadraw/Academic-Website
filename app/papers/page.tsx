import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ThemeToggle } from "../components/ThemeToggle";

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
        };
    });

    return (
        <main className="min-h-screen w-full mx-auto px-8 py-16 font-serif bg-[#98A869] dark:bg-zinc-900 text-center transition-colors duration-300">

            {/* Navbar */}
            <nav className="absolute top-0 left-0 right-0 flex justify-end items-center px-8 py-4">
                <ThemeToggle />
            </nav>

            <h1 className="text-[2.9rem] mb-8 mr-[3.2rem]">
                <Link
                    href="/"
                    className="text-[#1F2520] dark:text-zinc-100 no-underline"
                >
                    &larr; Publications
                </Link>
            </h1>

<div className="mt-8">
    {papers.map((paper) => (
        <div
            key={paper.slug}
            className="mb-[1.4rem] text-[1.5rem] pb-[0.2rem]"
        >
            
            <Link
                href={`/papers/${paper.slug}`}
                className="text-[#1F2520] dark:text-zinc-200 no-underline text-[1.45rem] font-medium leading-normal tracking-[0.2px] inline-block max-w-162.5"
            >

                {paper.title}

            </Link>
        </div>
    ))}
</div>
        </main>
    );
}