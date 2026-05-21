"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const reflections = [
"Refreshing pages that no longer exist.",
"Reading theory like it’s weather forecasted doom.",
"Saving screenshots of conversations that meant something once.",
"Watching cursor blink like it knows more than I do.",
"Opening tabs as if they are unfinished thoughts.",
"Trying to remember why I came here in the first place.",
"Downloading memories I will never open again.",
"Thinking in footnotes instead of sentences.",
"Rewriting silence into academic language.",
"Scrolling through versions of myself I don’t recognize.",
"Leaving messages for nobody in particular.",
"Treating late-night internet as field research.",
"Confusing nostalgia with data corruption.",
"Watching text decay into meaning.",
"Calling it research when it is actually disappearance.",
"Reading too much into loading screens.",
"Waiting for meaning to buffer.",
"Turning emotional static into methodology.",
"Writing like the archive is judging me.",
"Checking if the internet remembers me differently today.",
"Storing feelings in unnamed folders.",
"Deleting things I don’t fully understand yet.",
"Searching for patterns in broken links.",
"Listening to silence between network requests.",
"Treating memory like a broken API.",
"Assuming everything is temporary except the feeling it leaves.",
"Watching digital space become emotional geography."
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
  "Nothing to be Done",
  "The Archive Remembers",
  "Language Leaves Scars",
  "Performance Survives",
  "History Performs Itself",
  "Silence is Political"
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
  const [clicks, setClicks] = useState(0);
  const [secret, setSecret] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 25,
    stiffness: 120
  });

  const smoothY = useSpring(mouseY, {
    damping: 25,
    stiffness: 120
  });

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
    }, 7000);

    return () => {
      clearInterval(r);
      clearInterval(m);
    };
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const particles = useMemo(
    () =>
      Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 15 + Math.random() * 25,
        size: 1 + Math.random() * 4
      })),
    []
  );

  const waves = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i,
        top: 10 + i * 12,
        duration: 12 + i * 4,
        opacity: 0.04 + i * 0.015
      })),
    []
  );

  const handleSecret = () => {
    const next = clicks + 1;
    setClicks(next);

    if (next >= 5) {
      setSecret(true);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#071019] text-zinc-200 font-serif">

      {/* Ocean Background */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Base Ocean Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08131d] via-[#0a1c2c] to-[#04070d]" />

        {/* Animated Waves */}
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            animate={{
              x: ["-10%", "10%", "-10%"],
              y: [0, -20, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: wave.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute left-[-20%] w-[140%] h-52 rounded-[100%]"
            style={{
              top: `${wave.top}%`,
              opacity: wave.opacity,
              background:
                "radial-gradient(circle at center, rgba(80,120,200,0.25), transparent 70%)",
              filter: "blur(60px)"
            }}
          />
        ))}

        {/* Moving Water Texture */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "120px 120px"
          }}
        />

        {/* Cursor Water Glow */}
        <motion.div
          className="pointer-events-none absolute w-[700px] h-[700px] rounded-full"
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            background:
              "radial-gradient(circle, rgba(100,160,255,0.12), transparent 70%)",
            filter: "blur(80px)"
          }}
        />

        {/* Deep Fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{
              y: "-20vh",
              x: [0, 20, -20, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute rounded-full bg-blue-200/20 blur-sm"
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
          animate={{
            opacity: [0.02, 0.06, 0.02],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity
          }}
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
        className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-blue-200/70 font-mono z-20"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {message}
      </motion.div>

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] uppercase tracking-[0.4em] text-blue-200 font-mono mb-8"
        >
          Research · Fragments · Signals · Ruins
        </motion.p>

        <motion.h1
          onClick={handleSecret}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl text-zinc-100 cursor-pointer select-none"
          style={{
            textShadow: "0 0 35px rgba(120,170,255,0.15)"
          }}
        >
          Sadra Daneshmand
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.4 }}
          className="h-px bg-blue-200/30 mx-auto mt-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10 text-xl italic text-zinc-300 max-w-2xl"
        >
          A digital archive of language, memory, and emotional residue.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-zinc-400 max-w-3xl"
        >
          Discourse · Media · Digital culture · Fragmented identity ·
          Online melancholy · Performative politics
        </motion.p>

        <motion.a
          href="#nav"
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 30px rgba(120,170,255,0.2)"
          }}
          className="mt-14 border border-blue-200/20 px-8 py-4 uppercase tracking-[0.3em] text-blue-100 hover:bg-white/5 transition"
        >
          Enter Archive →
        </motion.a>
      </section>

      {/* NAVIGATION */}
      <section
        id="nav"
        className="relative z-10 px-6 py-28 border-t border-white/5"
      >
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {navItems.map((item) => (
            <motion.div
              whileHover={{
                y: -8,
                borderColor: "rgba(180,220,255,0.35)"
              }}
              key={item.href}
            >
              <Link
                href={item.href}
                className="block border border-white/10 p-8 bg-white/[0.02] backdrop-blur-md transition"
              >
                <h2 className="text-2xl italic text-zinc-100">
                  {item.label}
                </h2>

                <p className="mt-4 text-zinc-400">
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
            className="mt-10 text-xl italic text-zinc-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            “{reflection}”
          </motion.p>
        </AnimatePresence>
      </section>

      {/* SECRET */}
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

              <button
                onClick={() => setSecret(false)}
                className="mt-10 border border-blue-200/30 px-6 py-3 uppercase tracking-[0.3em]"
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