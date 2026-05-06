"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { songs } from "./soundcloud.data";

export default function SongsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        z-30
        p-3
        rounded-full
        backdrop-blur
        bg-black/40
        text-white
        transition-all
        hover:bg-black/70
        hover:scale-110
        active:scale-95
        ${direction === "left" ? "-left-6" : "-right-6"}
      `}
    >
      {icon}
    </button>
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, w, h);

      const bars = 80;
      const barWidth = w / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;

        const wave =
          Math.sin(i * 0.3 + t * 0.08) * 50 +
          Math.cos(i * 0.15 + t * 0.05) * 30;

        const height = 120 + wave;

        ctx.fillStyle = `rgba(255,255,255,${0.05 + i * 0.001})`;

        ctx.fillRect(x, h / 2 - height / 2, barWidth * 0.6, height);
      }

      t++;
      requestAnimationFrame(draw);
    };

    draw();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="relative min-h-screen px-8 py-16 bg-[#98A869] dark:bg-zinc-900 font-serif text-center overflow-hidden">

      {/* 🎧 BACKGROUND LAYER */}
      <canvas
        ref={canvasRef}
        className="absolutegit status inset-0 w-full h-full z-0 opacity-80"
      />

      {/* soft overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20 z-10 pointer-events-none" />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-20 pt-12 flex flex-col items-center"
      >
        {/* NAVBAR (now SAFE) */}
        <div className="relative z-30 w-full">
          <Navbar />
        </div>

        <h1 className="text-[2.3rem] mt-8 mb-3 tracking-[1px] z-20">
          <Link
            href="/media"
            className="text-[#1F2520] dark:text-[#98A869] hover:opacity-60 transition"
          >
            ← Music
          </Link>
        </h1>

        <p className="text-[1.1rem] text-[#383737] dark:text-zinc-100 mb-6 z-20">
          A Growing Archive of Original Music and Sonic Experiments.
        </p>

        {/* CAROUSEL */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-5xl z-20"
        >
          <ArrowButton direction="left" icon={<ChevronLeft size={26} />} />
          <ArrowButton direction="right" icon={<ChevronRight size={26} />} />

          <div
            ref={scrollRef}
            className="flex gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-6"
          >
            {sortedSongs.map((song, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className=" mt-15 shrink-0 w-full snap-center flex flex-col items-center"
              >
                <div className="w-[85%] max-w-2xl rounded-xl overflow-hidden shadow-xl bg-black/10 backdrop-blur-md">
                  <iframe
                    width="100%"
                    
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                      song.url
                    )}&color=%2398A869`}
                  />
                </div>

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