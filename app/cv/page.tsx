"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CVPage() {

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
          max-w-4xl
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
            &larr; Curriculum Vitae
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
            Research · Media · Digital Culture · Development
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
          Background in English Studies, discourse analysis,
          digital media, and independent creative production.
          Interested in research, interdisciplinary collaboration,
          and building thoughtful digital experiences.
        </p>

        {/* download button */}
        <a
          href="/cv.pdf"
          download
          className="
            mt-12
            px-6
            py-3
            rounded-full
            border
            border-black/15
            dark:border-white/15
            text-[0.95rem]
            tracking-wide
            text-[#1F2520]
            dark:text-zinc-100
            hover:bg-black/5
            dark:hover:bg-white/5
            transition-all
            duration-300
            backdrop-blur-sm
          "
        >
          Download CV ↓
        </a>

        {/* preview card */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.4,
          }}
          className="
            mt-18
            w-full
            max-w-3xl
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-black/10
              dark:border-white/10
              bg-white/20
              dark:bg-[#98A869]
              backdrop-blur-md
              p-10
              text-left
              shadow-xl
            "
          >

            {/* name */}
            <div className="mb-10">

              <h2
                className="
                  text-[2rem]
                  leading-tight
                  text-[#1F2520]
                  dark:text-zinc-700
                "
              >
                Sadra Daneshmand
              </h2>

              <p
                className="
                  mt-2
                  text-[1rem]
                  tracking-wide
                  text-[#383737]
                  dark:text-zinc-900
                "
              >
                MA English Studies · Discourse · Media · Language
              </p>

            </div>

            {/* sections */}
            <div className="space-y-10">

              {/* projects */}
              <div>

                <h3
                  className="
                    text-[1.15rem]
                    mb-4
                    tracking-wide
                    text-[#1F2520]
                    dark:text-zinc-700
                  "
                >
                  Projects & Portfolio
                </h3>

                <div className="space-y-5">

                  <div>
                    <p className="text-[#1F2520] dark:text-zinc-800">
                      Personal Academic & Media Website
                    </p>

                    <p className="text-sm leading-relaxed text-[#383737] dark:text-zinc-900 mt-1">
                      Built and designed independently using Next.js and Vercel.
                      Features publications, media archive, CV, and creative work.
                    </p>
                  </div>

                  <div>
                    <p className="text-[#1F2520] dark:text-zinc-900">
                      quot.is — Quotes & Facts Platform
                    </p>

                    <p className="text-sm leading-relaxed text-[#383737] dark:text-zinc-800 mt-1">
                      Collaborative full-stack platform with Android companion app,
                      REST API integration, and open-source development workflow.
                    </p>
                  </div>

                </div>

              </div>

              {/* experience */}
              <div>

                <h3
                  className="
                    text-[1.15rem]
                    mb-4
                    tracking-wide
                    text-[#1F2520]
                    dark:text-zinc-800
                  "
                >
                  Experience
                </h3>

                <div className="space-y-5">

                  <div>
                    <p className="text-[#1F2520] dark:text-zinc-900">
                      Junior Web Developer · Bastion Health
                    </p>

                    <p className="text-sm leading-relaxed text-[#383737] dark:text-zinc-900 mt-1">
                      Worked within a professional product team on front-end development
                      and production workflows.
                    </p>
                  </div>

                  <div>
                    <p className="text-[#1F2520] dark:text-zinc-800">
                      English Instructor & Translator
                    </p>

                    <p className="text-sm leading-relaxed text-[#383737] dark:text-zinc-800 mt-1">
                      Teaching, translation, and communication work across academic,
                      cultural, and professional contexts.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </main>
  );
}