"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

const reflections = [
  "Refreshing Pages That No Longer Exist.",
  "Reading Theory Like It’s Weather Forecasted Doom.",
  "Saving Screenshots Of Conversations That Meant Something Once.",
  "Watching Cursor Blink Like It Knows More Than I Do.",
  "Opening Tabs As If They Are Unfinished Thoughts.",
  "Trying To Remember Why I Came Here In The First Place.",
  "Downloading Memories I Will Never Open Again.",
  "Thinking In Footnotes Instead Of Sentences.",
  "Listening To Silence Between Network Requests.",
  "Treating Memory Like A Broken API.",
  "Waiting For Meaning To Buffer.",
  "Watching Digital Space Become Emotional Geography.",
];

const systemMessages = [
  "[ archive syncing ]",
  "[ emotional residue detected ]",
  "[ signal unstable ]",
  "[ memory reconstruction in progress ]",
  "[ audio layer dormant ]",
  "[ unstable oceanic memory field ]",
];

const floatingQuotes = [
  "The Archive Remembers",
  "Nothing Truly Loads Forever",
  "Language Leaves Scars",
  "Silence Is Political",
  "Digital Ghosts Never Sleep",
];

const navItems = [
  {
    href: "/papers",
    label: "Texts",
    sub: "Academic Artifacts",
  },
  {
    href: "/media",
    label: "Signals",
    sub: "Audio + Visual Fragments",
  },
  {
    href: "/archive",
    label: "Fragments",
    sub: "Recovered Memory Layers",
  },
  {
    href: "/typing",
    label: "Terminal",
    sub: "Competitive Cognitive Deterioration",
  },
  {
    href: "/contact",
    label: "Transmission",
    sub: "Send A Signal",
  },
  {
    href: "/cv",
    label: "Records",
    sub: "Institutional Remains",
  },
];

export default function Home() {
  const [reflection, setReflection] = useState(reflections[0]);
  const [message, setMessage] = useState(systemMessages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secret, setSecret] = useState(false);
  const [clicks, setClicks] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 20,
    stiffness: 100,
  });

  const smoothY = useSpring(mouseY, {
    damping: 20,
    stiffness: 100,
  });

  const { scrollYProgress } = useScroll();

  const oceanDepth = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(0px)", "translateY(300px)"]
  );

  /* ---------------- AUDIO ---------------- */

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  /* ---------------- REFLECTIONS ---------------- */

  useEffect(() => {
    const r = setInterval(() => {
      setReflection(
        reflections[Math.floor(Math.random() * reflections.length)]
      );
    }, 5000);

    const m = setInterval(() => {
      setMessage(
        systemMessages[Math.floor(Math.random() * systemMessages.length)]
      );
    }, 6500);

    return () => {
      clearInterval(r);
      clearInterval(m);
    };
  }, []);

  /* ---------------- CURSOR ---------------- */

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  /* ---------------- SECRET ---------------- */

  const handleSecret = () => {
    const next = clicks + 1;
    setClicks(next);

    if (next >= 5) {
      setSecret(true);
    }
  };

  /* ---------------- PARTICLES ---------------- */

  const particles = useMemo(
    () =>
      Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 4,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 10,
      })),
    []
  );

  /* ---------------- WAVES ---------------- */

  const waves = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        top: 5 + i * 12,
        duration: 12 + i * 4,
        opacity: 0.04 + i * 0.02,
      })),
    []
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040b14] text-zinc-200 font-serif">

      {/* AUDIO */}
      <audio ref={audioRef} src="/audio/dnbman.mp3" loop />

      {/* OCEAN BACKGROUND */}
      <motion.div
        style={{
          transform: oceanDepth,
        }}
        className="absolute inset-0 overflow-hidden"
      >

        {/* BASE */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08131d] via-[#071625] to-[#02050a]" />

        {/* WAVES */}
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[-20%] w-[140%] h-64 rounded-[100%]"
            style={{
              top: `${wave.top}%`,
              opacity: wave.opacity,
              background:
                "radial-gradient(circle at center, rgba(90,140,255,0.25), transparent 70%)",
              filter: "blur(70px)",
            }}
          />
        ))}

        {/* WATER TEXTURE */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        {/* DEEP FOG */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      </motion.div>

      {/* CURSOR GLOW */}
      <motion.div
        className="pointer-events-none fixed z-0 w-[700px] h-[700px] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(120,180,255,0.10), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* GRAIN */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* PARTICLES */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: "-20vh",
              x: [0, 20, -20, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute rounded-full bg-blue-200/20 blur-sm"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* FLOATING QUOTES */}
      {floatingQuotes.map((q, i) => (
        <motion.div
          key={q}
          animate={{
            opacity: [0.02, 0.06, 0.02],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
          }}
          className="pointer-events-none absolute text-5xl italic text-zinc-100 whitespace-nowrap"
          style={{
            top: `${10 + i * 14}%`,
            left: i % 2 === 0 ? "5%" : "55%",
          }}
        >
          {q}
        </motion.div>
      ))}

      {/* SYSTEM MESSAGE */}
      <motion.div
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-blue-200/70 z-20"
      >
        {message}
      </motion.div>

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.4em] text-blue-300 mb-6"
        >
          Archive · Signal · Decay · Memory
        </motion.p>

        <motion.h1
          onClick={handleSecret}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl select-none cursor-pointer"
          style={{
            textShadow: "0 0 40px rgba(120,180,255,0.18)",
          }}
        >
          Sadra Daneshmand
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.5 }}
          className="h-px bg-blue-300/30 mt-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 text-xl italic text-zinc-300 max-w-2xl"
        >
          A drifting archive of emotional noise and fragmented memory.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-zinc-400 max-w-3xl"
        >
          Discourse · Media · Digital Culture · Fragmented Identity
        </motion.p>

        {/* ENTER ARCHIVE */}
        <motion.div
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 35px rgba(120,180,255,0.2)",
          }}
        >
          <Link
            href="#nav"
            className="mt-12 inline-block border border-blue-300/20 px-8 py-4 uppercase tracking-[0.3em] hover:bg-white/5 transition"
          >
            Enter Archive →
          </Link>
        </motion.div>

        {/* AUDIO BUTTON */}
        <button
          onClick={toggleAudio}
          className="mt-6 border border-blue-300/20 px-6 py-2 text-xs uppercase tracking-[0.3em] hover:bg-white/5 transition"
        >
          {isPlaying ? "Pause DNB" : "Play DNB"}
        </button>
      </section>

      {/* NAV */}
      <section
        id="nav"
        className="relative z-10 px-6 py-24 border-t border-white/10"
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {navItems.map((item) => (
            <motion.div
              key={item.href}
              whileHover={{
                y: -8,
                borderColor: "rgba(180,220,255,0.35)",
              }}
            >
              <Link
                href={item.href}
                className="block border border-white/10 p-8 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] transition"
              >
                <h2 className="text-2xl italic text-zinc-100">
                  {item.label}
                </h2>

                <p className="text-zinc-400 mt-3">
                  {item.sub}
                </p>
              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* REFLECTION */}
      <section className="py-28 text-center relative z-10">
        <p className="text-xs uppercase tracking-[0.4em] text-blue-200">
          Current Reflection
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={reflection}
            className="text-xl italic max-w-2xl mx-auto mt-10 text-zinc-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            “{reflection}”
          </motion.p>
        </AnimatePresence>
      </section>

      {/* SECRET SCREEN */}
      <AnimatePresence>
        {secret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center text-center px-6"
          >
            <div>

              <p className="text-blue-200 uppercase tracking-[0.4em] text-xs">
                Hidden Archive
              </p>

              <h2 className="text-4xl mt-10 text-zinc-100">
                Nothing Remains Archived Forever
              </h2>

              <p className="mt-6 text-zinc-400 max-w-xl">
                The Ocean Keeps Every Signal Somewhere Beneath The Surface.
              </p>

              <button
                onClick={() => setSecret(false)}
                className="mt-10 border border-blue-300/20 px-6 py-3 uppercase tracking-[0.3em]"
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