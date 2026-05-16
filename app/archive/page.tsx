"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ArchivePage() {

  const archiveItems = [
    {
      title: "Old Research Notes",
      description: "Fragments, unfinished thoughts, annotations, and abandoned directions.",
      href: "#",
    },
    {
      title: "Visual Experiments",
      description: "Early photography studies, color tests, and interface sketches.",
      href: "#",
    },
    {
      title: "Digital Fragments",
      description: "Collected screenshots, internet residues, and online atmospheres.",
      href: "#",
    },
    {
      title: "Sound & Music Drafts",
      description: "Ambient loops, unfinished tracks, and sonic textures.",
      href: "#",
    },
  ];

  return (

    <main
      className="
        min-h-screen
        w-full
        px-8
        py-16
        bg-[#98A869]
        dark:bg-zinc-900
        transition-colors duration-500
        font-serif
        flex
        flex-col
        items-center
      "
    >

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="
          pt-18
          flex
          flex-col
          items-center
          text-center
          max-w-3xl
          w-full
        "
      >

        {/* title */}
        <h1
          className="
            text-[2.5rem]
            tracking-[1px]
            mb-4
          "
        >

          <Link
            href="/"
            className="
              text-[#1F2520]
              dark:text-zinc-100
              no-underline
              hover:opacity-65
              transition
            "
          >
            &larr; Archive
          </Link>

        </h1>

        {/* subtitle */}
        <p
          className="
            text-[1.05rem]
            leading-relaxed
            tracking-wide
            text-[#383737]
            dark:text-zinc-300
            relative
            group
            overflow-hidden
            inline-block
            cursor-default
          "
        >

          <span className="relative z-10">
            Notes · Fragments · Unfinished Work · Digital Residue
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

        {/* intro */}
        <p
          className="
            mt-14
            max-w-2xl
            text-[1.08rem]
            leading-[2rem]
            tracking-[0.2px]
            text-[#1F2520]
            dark:text-zinc-100
          "
        >
          A space for unfinished ideas, archived materials,
          experimental drafts, and things that do not yet belong elsewhere.
        </p>

        {/* archive items */}
        <div
          className="
            mt-16
            w-full
            flex
            flex-col
            gap-10
          "
        >

          {archiveItems.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
            >

              <Link
                href={item.href}
                className="
                  block
                  group
                  border-b
                  border-black/10
                  dark:border-white/10
                  pb-8
                  hover:opacity-70
                  transition-all
                  duration-300
                "
              >

                <h2
                  className="
                    text-[1.45rem]
                    text-[#1F2520]
                    dark:text-zinc-100
                    leading-snug
                  "
                >
                  {item.title}
                </h2>

                <p
                  className="
                    mt-3
                    text-[1rem]
                    leading-relaxed
                    tracking-wide
                    text-[#383737]
                    dark:text-zinc-400
                  "
                >
                  {item.description}
                </p>

              </Link>

            </motion.div>

          ))}

        </div>

      </motion.div>

    </main>
  );
}