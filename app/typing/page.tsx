"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const quotes = [
  "Refreshing Pages That No Longer Exist.",
  "Reading Theory Like It’s Weather Forecasted Doom.",
  "Watching Cursor Blink Like It Knows More Than I Do.",
  "Opening Tabs As Unfinished Thoughts.",
  "Thinking In Footnotes Instead Of Sentences.",
  "Downloading Memories I Will Never Open Again.",
  "Treating Language As A Competitive Sport.",
];

const systemFeed = [
  "[ typing layer initialized ]",
  "[ cognitive load unstable ]",
  "[ language processor overheating ]",
  "[ memory drift detected ]",
  "[ semantic integrity weakening ]",
];

const testText =
  "Language collapses into rhythm when speed replaces meaning and thought becomes movement across keys.";

export default function TypingPage() {
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [feed, setFeed] = useState(systemFeed[0]);
  const [quote, setQuote] = useState(quotes[0]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioOn, setAudioOn] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  /* ---------------- CURSOR ---------------- */
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* ---------------- SYSTEM FEED ---------------- */
  useEffect(() => {
    const f = setInterval(() => {
      setFeed(systemFeed[Math.floor(Math.random() * systemFeed.length)]);
    }, 4000);

    const q = setInterval(() => {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 6000);

    return () => {
      clearInterval(f);
      clearInterval(q);
    };
  }, []);

  /* ---------------- TYPING ENGINE ---------------- */
  useEffect(() => {
    if (!startTime && input.length > 0) {
      setStartTime(Date.now());
    }

    if (startTime) {
      const timeMinutes = (Date.now() - startTime) / 60000;
      const wordsTyped = input.trim().split(/\s+/).length;
      setWpm(Math.round(wordsTyped / timeMinutes || 0));

      let correct = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === testText[i]) correct++;
      }

      setAccuracy(Math.round((correct / input.length) * 100) || 100);
    }
  }, [input]);

  /* ---------------- AUDIO ---------------- */
  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setAudioOn(true);
    } else {
      audioRef.current.pause();
      setAudioOn(false);
    }
  };

  /* ---------------- BACKGROUND WAVES ---------------- */
  const waves = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        top: i * 14,
        opacity: 0.03 + i * 0.02,
      })),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B10] text-zinc-200 font-serif">

      {/* AUDIO */}
      <audio ref={audioRef} src="/audio/dnbman.mp3" loop />

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none fixed w-[500px] h-[500px] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(120,180,255,0.15), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* BACKGROUND WAVES */}
      <div className="absolute inset-0">
        {waves.map((w) => (
          <motion.div
            key={w.id}
            className="absolute left-[-20%] w-[140%] h-60 rounded-full"
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 12 + w.id * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: `${w.top}%`,
              opacity: w.opacity,
              background:
                "radial-gradient(circle, rgba(90,140,255,0.2), transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        ))}
      </div>

      {/* SYSTEM FEED */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-blue-200/60">
        {feed}
      </div>

      {/* HERO */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        <p className="text-xs uppercase tracking-[0.4em] text-blue-300 mb-6">
          Typing Competition · Language Drift · Cognitive Noise
        </p>

        <h1 className="text-5xl md:text-7xl">
          Typing Arena
        </h1>

        <div className="w-40 h-px bg-blue-300/30 mt-8" />

        <p className="mt-10 text-lg italic max-w-2xl text-zinc-300">
          {testText}
        </p>

        {/* INPUT */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-10 w-full max-w-3xl h-40 p-4 bg-black/30 border border-white/10 outline-none text-zinc-200"
          placeholder="Start typing here..."
        />

        {/* STATS */}
        <div className="mt-6 flex gap-10 text-sm text-zinc-400">
          <p>WPM: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
        </div>

        {/* AUDIO BUTTON */}
        <button
          onClick={toggleAudio}
          className="mt-10 border border-blue-300/20 px-6 py-2 text-xs uppercase tracking-[0.3em]"
        >
          {audioOn ? "Pause DNB" : "Play DNB"}
        </button>
      </section>

      {/* VISUAL IMAGES */}
      <section className="relative z-10 py-32 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"].map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="relative h-64 border border-white/10 overflow-hidden"
          >
            <Image
              src={img}
              alt="typing visual"
              fill
              className="object-cover opacity-80"
            />
          </motion.div>
        ))}

      </section>

      {/* QUOTE */}
      <section className="relative z-10 text-center py-20">
        <AnimatePresence mode="wait">
          <motion.p
            key={quote}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="italic text-zinc-300 max-w-2xl mx-auto"
          >
            “{quote}”
          </motion.p>
        </AnimatePresence>
      </section>

    </main>
  );
}