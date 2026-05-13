"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type Paper = {
  slug: string;
  title: string;
  excerpt: string;
  year: string;
  status: string;
  pdfUrl: string;
};

const PAGE_SIZE = 3;

export function PapersViewer({ papers }: { papers: Paper[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(papers.length / PAGE_SIZE);
  const visible = papers.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className="mt-1 w-full max-w-2xl flex flex-col"
    >
      <div className="min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {visible.map((paper) => (
              <Link
                key={paper.slug}
                href={`/papers/${paper.slug}`}
                className="group block py-6 border-b border-[#1F2520]/15 dark:border-zinc-700/50 last:border-b-0 transition-all duration-300 hover:opacity-75"
              >
                <span className="inline-block mb-2 text-[0.7rem] uppercase tracking-[0.3em] text-[#1F2520]/45 dark:text-zinc-500 font-sans">
                  {paper.year}
                  {paper.status && (
                    <>
                      <span className="mx-2 opacity-40">·</span>
                      <span>{paper.status}</span>
                    </>
                  )}
                </span>

                <h2 className="text-[1.55rem] leading-snug tracking-[0.2px] text-[#1F2520] dark:text-zinc-100 group-hover:text-[#1F2520]/80 dark:group-hover:text-zinc-200 transition-colors duration-200">
                  {paper.title}
                </h2>

                <p className="mt-1.5 text-[0.97rem] leading-relaxed tracking-wide text-[#383737]/80 dark:text-zinc-400 max-w-xl mx-auto">
                  {paper.excerpt}
                </p>

                <a
                  href={paper.pdfUrl}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block mt-2 text-[0.78rem] font-sans tracking-wide text-[#1F2520]/35 dark:text-zinc-600 group-hover:text-[#1F2520]/60 dark:group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-200"
                >
                  Download PDF ↓
                </a>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="text-[0.78rem] font-sans uppercase tracking-[0.25em] text-[#1F2520]/40 dark:text-[#98A869] hover:text-[#1F2520]/70 dark:hover:text-zinc-400 disabled:opacity-20 transition-all duration-200 hover:-translate-x-0.5"
          >
            ← Prev
          </button>

          <span className="text-[0.7rem] font-sans uppercase tracking-[0.3em] text-[#1F2520]/30 dark:text-zinc-600">
            {page + 1} / {totalPages}
          </span>

          <button
            onClick={() =>
              setPage((p) => Math.min(totalPages - 1, p + 1))
            }
            disabled={page === totalPages - 1}
            className="text-[0.78rem] font-sans uppercase tracking-[0.25em] text-[#1F2520]/40 dark:text-[#98A869] hover:text-[#1F2520]/70 dark:hover:text-zinc-400 disabled:opacity-20 transition-all duration-200 hover:translate-x-0.5"
          >
            Next →
          </button>
        </div>
      )}

      <p className="mt-8 text-[0.72rem] uppercase tracking-[0.3em] text-[#1F2520]/30 dark:text-[#98A869] font-sans">
        {papers.length} publication{papers.length !== 1 ? "s" : ""}
      </p>
    </motion.div>
  );
}