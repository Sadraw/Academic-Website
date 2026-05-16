"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EmailCopy } from "../components/EmailCopy";

export default function ContactPage() {

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
          max-w-2xl
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
            &larr; Contact
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
            Research · Media · Digital Culture · Collaboration
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

        {/* main text */}
        <div className="mt-14 space-y-7">

          <p
            className="
              text-[1.15rem]
              leading-[2rem]
              tracking-[0.2px]
              text-[#1F2520]
              dark:text-zinc-100
            "
          >
            If you'd like to talk about research,
            digital media, discourse, visual culture,
            or collaborative projects,
            feel free to reach out.
          </p>

          <p
            className="
              text-[1rem]
              leading-relaxed
              tracking-wide
              text-[#383737]
              dark:text-zinc-400
            "
          >
            I’m especially interested in interdisciplinary work,
            experimental digital projects,
            and conversations around online spaces,
            identity, and contemporary culture.
          </p>

        </div>

        {/* email */}
        <div className="mt-12">
          <EmailCopy />
        </div>

        {/* location */}
        <a
          href="https://www.google.com/search?q=Graz+Austria"
          target="_blank"
          rel="noopener noreferrer"
          className="
            mt-10
            text-[0.82rem]
            tracking-[0.22em]
            uppercase
            font-sans
            text-[#1F2520]/60
            dark:text-zinc-500
            hover:opacity-70
            transition
          "
        >
          Graz · Austria
        </a>

      </motion.div>

    </main>
  );
}