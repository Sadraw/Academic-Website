"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LightboxImage } from "../components/LightboxImage";

export default function MediaPage() {
  const [open, setOpen] = useState(false);

  return (
    <main
      className="
        min-h-screen
        px-8
        py-16
        bg-[#98A869]
        dark:bg-zinc-900
        font-serif
        flex
        flex-col
        items-center
        text-center
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        className="pt-12 flex flex-col items-center w-full max-w-3xl"
      >
        {/* Title */}
        <h1 className="text-[2.3rem] mb-4 tracking-[1px] text-center">
          <Link
            href="/"
            className="text-[#1F2520] dark:text-[#98A869] hover:opacity-65 transition"
          >
            &larr; Media
          </Link>
        </h1>

        {/* Elegant Sub Link */}
        <div className="mb-6 group relative inline-block">
          <Link
            href="/media/photos"
            className="
              text-[1.1rem]
              tracking-wide
              text-[#383737]
              dark:text-zinc-100
              transition
              hover:opacity-80
            "
          >
            <span className="relative z-10">
              → View Photography
            </span>

            {/* underline */}
            <span
              className="
                absolute
                left-0
                bottom-0
                h-px
                w-0
                bg-current
                transition-all
                duration-500
                group-hover:w-full
              "
            />

            {/* glow */}
            <span
              className="
                pointer-events-none
                absolute
                left-0
                top-1/2
                h-[40%]
                w-full
                -translate-y-1/2
                -translate-x-full
                bg-linear-to-r
                from-transparent
                via-white/60
                to-transparent
                blur-sm
                opacity-0
                group-hover:opacity-40
                group-hover:translate-x-full
                transition-all
                duration-1000
                ease-out
              "
            />
          </Link>
        </div>

        {/* Subtitle */}
        <p
          className="
            text-[1.3rem]
            leading-relaxed
            tracking-wide
            text-[#383737]
            dark:text-zinc-100
            group
            relative
            overflow-hidden
            cursor-default
            mb-10
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
              bg-gradient-to-r
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

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.9,
          }}
          className="w-full"
        >
          <div
            className="
              relative
              w-full
              aspect-[3/2]
              overflow-hidden
              rounded-xl
              shadow-lg
              cursor-pointer
              transition-transform duration-300
              hover:scale-[1.01]
            "
            onClick={() => setOpen(true)}
          >
            <Image
              src="/images/the-man-in-the-sun.jpg"
              alt="Street in Graz"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* LIGHTBOX */}
          <LightboxImage
            isOpen={open}
            onClose={() => setOpen(false)}
            src="/images/the-man-in-the-sun.jpg"
            alt="photo"
            title="The Man in the Sun"
            date="29.04.2026"
            description="Captured during a late afternoon near the university"
          />
        </motion.div>
      </motion.div>
    </main>
  );
}