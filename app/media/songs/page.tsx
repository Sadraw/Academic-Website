"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { songs } from "./soundcloud.data";

export default function SongsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sortedSongs = [...songs].sort(
    (a, b) =>
      new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()
  );

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        dir === "left"
          ? -scrollRef.current.offsetWidth * 0.8
          : scrollRef.current.offsetWidth * 0.8,
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
        transition-all
        duration-200
        hover:bg-black/60
        hover:scale-110
        cursor-pointer
        active:scale-95
        ${direction === "left" ? "-left-5" : "-right-5"}
      `}
    >
      {icon}
    </button>
  );

  return (
    <main className="min-h-screen px-8 py-16 bg-[#98A869] dark:bg-zinc-900 font-serif text-center">
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        className="pt-12 flex flex-col items-center"
      >
        <Navbar />

        {/* HEADER */}
        <h1 className="text-[2.3rem] mt-8 mb-3 tracking-[1px]">
          <Link
            href="/media"
            className="text-[#1F2520] dark:text-[#98A869] hover:opacity-60 transition"
          >
            ← Music
          </Link>
        </h1>
        {/* Subtitle */}
        <p
          className="
            text-[1.1rem]
            leading-relaxed
            tracking-wide
            text-[#383737]
            dark:text-zinc-100
            group
            relative
            overflow-hidden
            cursor-default
            mb-6
          "
        >
          <span className="relative z-10">
            
            A Growing Archive of Original Music and Sonic Experiments.

          </span>

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


        {/* CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
          className="relative w-full max-w-5xl"
        >
          {/* ARROWS */}
          <ArrowButton direction="left" icon={<ChevronLeft size={26} />} />
          <ArrowButton direction="right" icon={<ChevronRight size={26} />} />

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
              px-6
            "
          >
            {sortedSongs.map((song, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="
                  shrink-0
                  w-full
                  snap-center
                  flex
                  flex-col
                  items-center
                "
              >
                {/* PLAYER */}
                <div className="w-[85%] max-w-2xl rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                      song.url
                    )}&color=%2398A869&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
                  />
                </div>

                {/* TEXT */}
                <div className="mt-5 text-[#383737] dark:text-zinc-100">
                  <p className="text-[1.2rem]">{song.title}</p>
                  <p className="text-sm opacity-70">{song.releasedAt}</p>
                  <p className="text-sm mt-1 opacity-60 max-w-md mx-auto">
                    {song.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}