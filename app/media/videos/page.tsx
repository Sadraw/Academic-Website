"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { videos } from "./videos.data";
import { Navbar } from "@/app/components/Navbar";

/* ---------------- GLITCH LAYERS ---------------- */

function GlitchFX() {
  return (
    <>
      {/* scanlines */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_3px]" />

      {/* noise */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* RGB flicker */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-50 mix-blend-screen"
        animate={{
          opacity: [0.05, 0.12, 0.03, 0.08],
          x: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.25,
          repeat: Infinity,
        }}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,80,0.05), rgba(0,255,255,0.04), rgba(120,180,255,0.03))",
        }}
      />
    </>
  );
}

/* ---------------- PAGE ---------------- */

export default function VideoPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        dir === "left"
          ? -scrollRef.current.offsetWidth * 0.85
          : scrollRef.current.offsetWidth * 0.85,
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
        absolute top-1/2 -translate-y-1/2 z-20
        p-3 rounded-full
        backdrop-blur-md
        bg-black/40 text-white
        border border-white/10
        transition
        hover:scale-110 hover:bg-black/70
        active:scale-95
        ${direction === "left" ? "-left-16" : "-right-16"}
      `}
    >
      {icon}
    </button>
  );

  /* floating particles */
  const particles = useMemo(
    () =>
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        duration: 10 + Math.random() * 15,
      })),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-zinc-200 font-serif">

      {/* GLITCH LAYERS */}
      <GlitchFX />

      {/* AMBIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060a] via-[#050b14] to-black" />

      {/* PARTICLES */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-300/20 blur-sm"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: ["110vh", "-10vh"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none fixed w-[600px] h-[600px] rounded-full z-10"
        animate={{
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(120,180,255,0.12), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-20 min-h-screen px-8 py-16 text-center">

        <Navbar />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="pt-12 flex flex-col items-center"
        >
          <h1 className="text-[2.5rem] mt-6 mb-3 tracking-wide">
            <Link
              href="/media"
              className="text-white/80 hover:text-white transition"
            >
              ← Videos
            </Link>
          </h1>

          <p className="text-sm text-zinc-400 tracking-wide max-w-xl">
            Motion studies, fragments, and recorded time collapsing into signal.
          </p>
        </motion.div>

        {/* CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-4xl mx-auto mt-16"
        >
          <ArrowButton direction="left" icon={<ChevronLeft size={26} />} />
          <ArrowButton direction="right" icon={<ChevronRight size={26} />} />

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="
              flex gap-10 overflow-x-auto scroll-smooth
              snap-x snap-mandatory px-6 hide-scrollbar
            "
          >
            {videos.map((video, i) => (
              <motion.div
                key={i}
                className="shrink-0 w-full snap-center"
                whileHover={{ scale: 1.01 }}
              >
                {/* FRAME */}
                <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-blue-500/20 via-white/10 to-blue-500/20">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-2 shadow-2xl">
                    <div className="aspect-video w-full">
                      <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>

                {/* TEXT */}
                <div className="mt-4">
                  <p className="text-lg text-white/90">{video.title}</p>
                  <p className="text-sm text-zinc-500">{video.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* subtle flicker text */}
        <motion.div
          className="mt-20 text-xs tracking-[0.4em] uppercase text-white/30"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          SIGNAL ARCHIVE · VIDEO MEMORY SYSTEM
        </motion.div>
      </div>
    </main>
  );
}g