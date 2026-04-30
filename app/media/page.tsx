"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function MediaPage() {
  return (
    <main
      className="
        min-h-screen
        px-8
        py-16
        bg-[#98A869]
        dark:bg-zinc-900
        font-serif
        text-center
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        className="
          pt-12
          flex
          flex-col
          items-center
        "
      >
        {/* Title */}
        <h1 className="text-[2.3rem] mb-2 mr-[3.2rem] tracking-[1px]">
          <Link
            href="/"
            className="text-[#1F2520] dark:text-[#98A869] no-underline hover:opacity-65 transition"
          >
            &larr; Media
          </Link>
        </h1>

        {/* Subtitle */}
        <p
          className="
            text-[1.3rem]
            font-serif
            leading-relaxed
            tracking-wide
            text-[#383737]
            dark:text-zinc-100
            group
            relative
            overflow-hidden
            cursor-default
          "
        >
          <span className="relative z-10">
            Visuals · Sounds · Digital Projects
          </span>

          {/* glow sweep */}
          <span
            className="
              pointer-events-none
              absolute
              left-0
              top-1/2
              h-[45%]
              w-full
              -translate-y-1/2
              -translate-x-full
              bg-linear-to-r
              from-transparent
              via-white/60
              to-transparent
              blur-sm
              opacity-10
              group-hover:opacity-40
              group-hover:translate-x-full
              transition-all
              duration-1000
              ease-out
            "
          />
        </p>

        <p className="text-[#383737] dark:text-zinc-100 text-[1.2rem] mb-10 tracking-wide" />

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.9,
          }}
          className="max-w-3xl w-full"
        >
          <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/the-man-in-the-sun.jpg"
              alt="Street in Graz"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}