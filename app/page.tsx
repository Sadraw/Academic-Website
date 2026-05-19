"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const reflections = [
  "Listening to Burial at 3AM.",
  "Reading Butler while sleep deprived.",
  "Thinking about abandoned internet forums.",
  "Researching emotional residue in digital spaces.",
  "Attempting to archive digital ghosts.",
  "Waiting for Godot in browser tabs."
];

const systemMessages = [
  "[ archive partially corrupted ]",
  "[ emotional residue detected ]",
  "[ discourse anomaly detected ]",
  "[ memory reconstruction in progress ]",
  "[ no salvation found ]",
  "[ loading forgotten fragments ]"
];

const floatingQuotes = [
  "nothing to be done",
  "the archive remembers",
  "language leaves scars",
  "performance survives",
  "history performs itself",
  "silence is political"
];

const navItems = [
  {
    href: "/papers",
    label: "Texts",
    sub: "Academic artifacts and unfinished obsessions"
  },
  {
    href: "/media",
    label: "Signals",
    sub: "Fragments of media, memory, and transmission"
  },
  {
    href: "/archive",
    label: "Fragments",
    sub: "Recovered material from unstable memory"
  },
  {
    href: "/contact",
    label: "Transmission",
    sub: "Send a signal into the archive"
  },
  {
    href: "/cv",
    label: "Records",
    sub: "Institutional remains and academic traces"
  }
];

export default function Home() {
  const [reflection, setReflection] = useState(reflections[0]);
  const [message, setMessage] = useState(systemMessages[0]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    const r = setInterval(() => {
      setReflection(reflections[Math.floor(Math.random() * reflections.length)]);
    }, 5000);

    const m = setInterval(() => {
      setMessage(systemMessages[Math.floor(Math.random() * systemMessages.length)]);
    }, 7000);

    return () => {
      clearInterval(r);
      clearInterval(m);
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 15 + Math.random() * 20,
        size: 1 + Math.random() * 3
      })),
    []
  );

  const handleSecret = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) setSecret(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0c0d0c] text-zinc-200 font-serif">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-40"
        style={{
          background: `radial-gradient(400px at ${cursor.x}px ${cursor.y}px, rgba(152,168,105,0.10), transparent 80%)`
        }}
      />

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-20vh", opacity: [0, 0.4, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full bg-[#98A869]/20 blur-sm"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>

      {/* Floating Quotes */}
      {floatingQuotes.map((q, i) => (
        <motion.div
          key={q}
          animate={{ opacity: 0.04 }}
          className="pointer-events-none absolute text-5xl italic text-zinc-100 whitespace-nowrap"
          style={{
            top: `${10 + i * 14}%`,
            left: i % 2 === 0 ? "5%" : "55%"
          }}
        >
          {q}
        </motion.div>
      ))}

      {/* System Message */}
      <motion.div
        className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-[#98A869]/70 font-mono"
      >
        {message}
      </motion.div>

      {/* HERO */}
      <section className="flex min-h-screen flex-col items-center justify-center text-center px-6 relative z-10">

        <p className="text-[10px] uppercase tracking-[0.4em] text-[#98A869] font-mono mb-8">
          Research · Fragments · Signals · Ruins
        </p>

        <h1
          onClick={handleSecret}
          className="text-5xl md:text-7xl text-zinc-100 cursor-pointer"
        >
          Sadra Daneshmand
        </h1>

        <div className="w-40 h-px bg-[#98A869]/30 mx-auto mt-8" />

        <p className="mt-10 text-xl italic text-zinc-300 max-w-2xl">
          A digital archive of language, memory, and emotional residue.
        </p>

        <p className="mt-6 text-zinc-400 max-w-3xl">
          Discourse · Media · Digital culture · Fragmented identity ·
          Online melancholy · Performative politics
        </p>

        <a
          href="#nav"
          className="mt-14 border border-[#98A869]/30 px-8 py-4 uppercase tracking-[0.3em] text-[#98A869] hover:bg-white/5"
        >
          Enter Archive →
        </a>
      </section>

      {/* NAVIGATION */}
      <section id="nav" className="relative z-10 px-6 py-28 border-t border-white/5">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-white/10 p-8 hover:border-[#98A869]/40 hover:bg-white/5 transition"
            >
              <h2 className="text-2xl italic text-zinc-100">{item.label}</h2>
              <p className="mt-4 text-zinc-400">{item.sub}</p>
            </Link>
          ))}

        </div>
      </section>

      {/* REFLECTION */}
      <section className="py-28 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.4em] text-[#98A869]">
          Current Reflection
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={reflection}
            className="mt-10 text-xl italic text-zinc-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            “{reflection}”
          </motion.p>
        </AnimatePresence>
      </section>

      {/* SECRET */}
      <AnimatePresence>
        {secret && (
          <motion.div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center text-center px-6">
            <div>
              <p className="text-[#98A869] uppercase tracking-[0.4em] text-xs">
                Hidden Archive
              </p>

              <h2 className="text-4xl mt-10 text-zinc-100">
                nothing remains archived forever
              </h2>

              <button
                onClick={() => setSecret(false)}
                className="mt-10 border border-[#98A869]/30 px-6 py-3 uppercase tracking-[0.3em]"
              >
                Return
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}