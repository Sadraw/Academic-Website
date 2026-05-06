"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { videos } from "./videos.data";
import { Navbar } from "@/app/components/Navbar";

export default function VideoPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        dir === "left"
          ? -scrollRef.current.offsetWidth
          : scrollRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const ArrowButton = ({
    direction,
    icon,
  }: {
    direction: "left" | "right";
    icon: React.ReactNode;
  }) => (
    <button
      onClick={() => scroll(direction)}
      className={`
        absolute
        top-1/2
        -translate-y-1/2
        z-10
        p-3
        rounded-full
        backdrop-blur
        bg-black/30
        text-white
        dark:bg-white/80
        dark:text-black/30
        transition-all
        duration-200
        hover:bg-black/60
        dark:hover:bg-[#98A869]
        hover:scale-110
        cursor-pointer
        active:scale-95
        ${direction === "left" ? "-left-10" : "-right-10"}
      `}
    >
      {icon}
    </button>
  );

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
      {/* PAGE FADE-IN */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        className="pt-12 flex flex-col items-center"
      >
        <Navbar />

        {/* HEADER */}
        <h1 className="text-[2.3rem] mt-8 mb-10 tracking-[1px]">
          <Link
            href="/media"
            className="text-[#1F2520] dark:text-[#98A869] hover:opacity-65 transition"
          >
            ← Media / Video
          </Link>
        </h1>

        {/* SCROLL SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.9,
          }}
          className="relative w-full max-w-5xl"
        >
          {/* ARROWS */}
          <ArrowButton
            direction="left"
            icon={<ChevronLeft size={26} />}
          />
          <ArrowButton
            direction="right"
            icon={<ChevronRight size={26} />}
          />

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-10
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              hide-scrollbar
            "
          >
            {videos.map((video, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="
                  shrink-0
                  w-full
                  snap-center
                "
              >
                <div
                  className="
                    relative
                    w-full
                    aspect-video
                    overflow-hidden
                    rounded-xl
                    shadow-xl
                  "
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* TEXT */}
                <div className="mt-4 text-[#383737] dark:text-zinc-100">
                  <p className="text-[1.2rem]">{video.title}</p>
                  <p className="text-sm opacity-70">{video.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}