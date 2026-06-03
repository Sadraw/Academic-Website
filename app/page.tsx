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
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────────

const reflections = [
  "Refreshing Pages That No Longer Exist.",
  "Reading Theory Like It's Weather Forecasted Doom.",
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

const orbitingWords = [
  "MEMORY_001",
  "LOST_SIGNAL",
  "ARCHIVE_NODE",
  "EMOTIONAL_CACHE",
  "UNRESOLVED",
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
  { href: "/papers",  label: "Texts",       sub: "Academic Artifacts" },
  { href: "/media",   label: "Signals",      sub: "Audio + Visual Fragments" },
  { href: "/archive", label: "Fragments",    sub: "Recovered Memory Layers" },
  { href: "/typing",  label: "Terminal",     sub: "Competitive Cognitive Deterioration" },
  { href: "/contact", label: "Transmission", sub: "Send A Signal" },
  { href: "/cv",      label: "Records",      sub: "Institutional Remains" },
];

// ─── GLITCH TEXT ───────────────────────────────────────────────────────────────

function GlitchText({
  children,
  className = "",
  onClick,
  style = {},
}: {
  children: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const [glitching, setGlitching] = useState(false);
  const [offset1, setOffset1] = useState({ x: 0, y: 0 });
  const [offset2, setOffset2] = useState({ x: 0, y: 0 });
  const [sliceY, setSliceY] = useState(50);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timeout = setTimeout(() => {
        setGlitching(true);
        setOffset1({
          x: (Math.random() - 0.5) * 14,
          y: (Math.random() - 0.5) * 6,
        });
        setOffset2({
          x: (Math.random() - 0.5) * -10,
          y: (Math.random() - 0.5) * 4,
        });
        setSliceY(20 + Math.random() * 60);
        setTimeout(() => {
          setGlitching(false);
          schedule();
        }, 120 + Math.random() * 180);
      }, 1800 + Math.random() * 3000);
    };
    schedule();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      onClick={onClick}
      className={className}
      style={{ position: "relative", display: "inline-block", cursor: onClick ? "pointer" : "default", ...style }}
    >
      {/* Cyan ghost */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: "rgba(0,255,240,0.55)",
          transform: glitching ? `translate(${offset1.x}px, ${offset1.y}px)` : "none",
          clipPath: glitching ? `polygon(0 0, 100% 0, 100% ${sliceY}%, 0 ${sliceY}%)` : "none",
          transition: "transform 0.04s",
          mixBlendMode: "screen",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {children}
      </span>

      {/* Red ghost */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: "rgba(255,30,80,0.45)",
          transform: glitching ? `translate(${offset2.x}px, ${offset2.y}px)` : "none",
          clipPath: glitching ? `polygon(0 ${sliceY}%, 100% ${sliceY}%, 100% 100%, 0 100%)` : "none",
          transition: "transform 0.04s",
          mixBlendMode: "screen",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {children}
      </span>

      {/* Real text */}
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
}

// ─── SCANLINES ─────────────────────────────────────────────────────────────────

function Scanlines() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99,
        pointerEvents: "none",
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        backgroundSize: "100% 4px",
      }}
    />
  );
}

// ─── NOISE OVERLAY ─────────────────────────────────────────────────────────────

function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const render = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() > 0.5 ? Math.floor(Math.random() * 255) : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = Math.random() * 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(render);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.35,
      }}
    />
  );
}

// ─── HORIZONTAL GLITCH BARS ────────────────────────────────────────────────────

function GlitchBars() {
  const [bars, setBars] = useState<{ id: number; y: number; h: number; x: number; w: number; color: string }[]>([]);

  useEffect(() => {
    const trigger = () => {
      const count = Math.floor(Math.random() * 4) + 1;
      const newBars = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        y: Math.random() * 100,
        h: 1 + Math.random() * 12,
        x: (Math.random() - 0.5) * 60,
        w: 30 + Math.random() * 70,
        color: Math.random() > 0.5 ? "rgba(0,255,240,0.12)" : "rgba(255,30,80,0.10)",
      }));
      setBars(newBars);
      setTimeout(() => setBars([]), 80 + Math.random() * 120);
      setTimeout(trigger, 600 + Math.random() * 2400);
    };
    const t = setTimeout(trigger, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" }}>
      {bars.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            top: `${b.y}%`,
            left: `${b.x}%`,
            width: `${b.w}%`,
            height: b.h,
            background: b.color,
            mixBlendMode: "screen",
          }}
        />
      ))}
    </div>
  );
}

// ─── MEMORY CORE ───────────────────────────────────────────────────────────────

function MemoryCore({ smoothX, smoothY }: { smoothX: any; smoothY: any }) {
  return (
    <motion.div
      className="absolute left-1/2 top-[42%] z-[1] pointer-events-none"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 6, -6, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ width: 190, height: 190 }}
      >
        {/* OUTER GLOW */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(120,180,255,0.28) 0%, rgba(40,80,140,0.12) 40%, transparent 72%)",
            filter: "blur(50px)",
          }}
        />

        {/* PULSE RINGS */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [0.7, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 10, delay: i * 2.2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(120,180,255,0.2)" }}
          />
        ))}

        {/* CENTRAL SPHERE */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full overflow-hidden"
          style={{ inset: "18%" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(180,220,255,0.25), rgba(30,60,100,0.15), rgba(0,0,0,0.6))",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(180,220,255,.15)",
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(180,220,255,.15), transparent)",
            }}
          />
        </motion.div>

        {/* ORBITING WORDS */}
        {orbitingWords.map((word, i) => {
          const angle = (360 / orbitingWords.length) * i;
          return (
            <motion.div
              key={word}
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 50 + i * 10, repeat: Infinity, ease: "linear" }}
            >
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `rotate(${angle}deg) translateX(120px)`,
                  transformOrigin: "0 0",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(180,220,255,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {word}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* SCAN LINE */}
        <motion.div
          animate={{ y: [-110, 110, -110] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0"
          style={{ height: 1, background: "rgba(180,220,255,0.35)", filter: "blur(1px)" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── CORRUPT COUNTER ───────────────────────────────────────────────────────────

function CorruptCounter({ value }: { value: number }) {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const [display, setDisplay] = useState(String(value));

  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay((prev) =>
        String(value)
          .split("")
          .map((char, idx) => {
            if (idx < iter) return String(value)[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iter >= String(value).length) clearInterval(interval);
      iter += 0.4;
    }, 40);
    return () => clearInterval(interval);
  }, [value]);

  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{display}</span>;
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [reflection, setReflection] = useState(reflections[0]);
  const [message, setMessage] = useState(systemMessages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secret, setSecret] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [titleGlitch, setTitleGlitch] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const { scrollYProgress } = useScroll();
  const oceanDepth = useTransform(
    scrollYProgress,
    [0, 1],
    ["translateY(0px)", "translateY(300px)"]
  );

  /* ── AUDIO ── */
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

  /* ── INTERVALS ── */
  useEffect(() => {
    const r = setInterval(
      () => setReflection(reflections[Math.floor(Math.random() * reflections.length)]),
      5000
    );
    const m = setInterval(
      () => setMessage(systemMessages[Math.floor(Math.random() * systemMessages.length)]),
      6500
    );
    return () => { clearInterval(r); clearInterval(m); };
  }, []);

  /* ── CURSOR ── */
  useEffect(() => {
    const move = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  /* ── SECRET ── */
  const handleSecret = () => {
    setTitleGlitch(true);
    setTimeout(() => setTitleGlitch(false), 600);
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) setSecret(true);
  };

  /* ── PARTICLES ── */
  const particles = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 10,
        isSquare: Math.random() > 0.75,
      })),
    []
  );

  /* ── WAVES ── */
  const waves = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        top: 5 + i * 12,
        duration: 12 + i * 4,
        opacity: 0.04 + i * 0.02,
      })),
    []
  );

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#020810",
        color: "#d4d8e0",
        fontFamily: "'Georgia', serif",
        cursor: "crosshair",
      }}
    >
      {/* AUDIO */}
      <audio ref={audioRef} src="/audio/dnbman.mp3" loop />

      {/* CINEMATIC EFFECTS */}
      <Scanlines />
      <NoiseOverlay />
      <GlitchBars />

      {/* VIGNETTE */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* LETTERBOX BARS */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 48,
          background: "#000",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 48,
          background: "#000",
          zIndex: 50,
          pointerEvents: "none",
        }}
      />

      {/* OCEAN BACKGROUND */}
      <motion.div
        style={{ transform: oceanDepth, position: "absolute", inset: 0, overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, #05111e, #071625, #020509)",
          }}
        />
        {waves.map((wave) => (
          <motion.div
            key={wave.id}
            animate={{ x: ["-10%", "10%", "-10%"], y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: wave.duration, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: `${wave.top}%`,
              left: "-20%",
              width: "140%",
              height: 256,
              borderRadius: "100%",
              opacity: wave.opacity,
              background:
                "radial-gradient(circle at center, rgba(60,120,255,0.3), transparent 70%)",
              filter: "blur(70px)",
            }}
          />
        ))}

        {/* WATER TEXTURE */}
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        {/* DEEP FOG */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </motion.div>

      {/* CURSOR GLOW */}
      <motion.div
        aria-hidden
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          position: "fixed",
          zIndex: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(80,160,255,0.10), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* PARTICLES */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4 }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: "110vh", opacity: 0 }}
            animate={{ y: "-20vh", x: [0, 20, -20, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: "rgba(120,200,255,0.22)",
              borderRadius: p.isSquare ? 0 : "50%",
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* FLOATING QUOTES */}
      {floatingQuotes.map((q, i) => (
        <motion.div
          key={q}
          aria-hidden
          animate={{ opacity: [0.015, 0.05, 0.015], y: [0, -10, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity }}
          style={{
            pointerEvents: "none",
            position: "absolute",
            fontSize: 44,
            fontStyle: "italic",
            color: "#cdd5e0",
            whiteSpace: "nowrap",
            top: `${10 + i * 14}%`,
            left: i % 2 === 0 ? "5%" : "50%",
            zIndex: 4,
            userSelect: "none",
          }}
        >
          {q}
        </motion.div>
      ))}

      {/* SYSTEM MESSAGE */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: "absolute",
          top: 60,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.4em",
          color: "rgba(120,180,255,0.7)",
          zIndex: 20,
          fontFamily: "monospace",
          whiteSpace: "nowrap",
        }}
      >
        {message}
      </motion.div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <MemoryCore smoothX={smoothX} smoothY={smoothY} />

      <section
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 24px",
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "rgba(100,160,255,0.8)",
            marginBottom: 24,
            fontFamily: "monospace",
          }}
        >
          Archive · Signal · Decay · Memory
        </motion.p>

        {/* ── TITLE ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handleSecret}
          style={{
            position: "relative",
            zIndex: 20,
            fontSize: "clamp(2.4rem, 8vw, 5.5rem)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            userSelect: "none",
            textShadow: "0 0 60px rgba(100,180,255,0.2)",
          }}
        >
          <GlitchText>Sadra Daneshmand</GlitchText>
        </motion.h1>

        {/* CLICK COUNTER HINT */}
        {clicks > 0 && clicks < 5 && (
          <motion.p
            key={clicks}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5 }}
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: "rgba(255,60,100,0.7)",
              letterSpacing: "0.3em",
              marginTop: 8,
            }}
          >
            [ SIGNAL INTERRUPT: <CorruptCounter value={5 - clicks} /> REMAINING ]
          </motion.p>
        )}

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.5 }}
          style={{ height: 1, background: "rgba(100,180,255,0.3)", marginTop: 32 }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            marginTop: 40,
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "rgba(210,220,235,0.75)",
            maxWidth: 600,
            lineHeight: 1.6,
          }}
        >
          A drifting archive of emotional noise and fragmented memory.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            marginTop: 24,
            color: "rgba(150,165,180,0.7)",
            maxWidth: 720,
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Discourse · Media · Digital Culture · Fragmented Identity
        </motion.p>

        {/* CTA BUTTONS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginTop: 48 }}>
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{
              border: "1px solid rgba(100,180,255,0.25)",
            }}
          >
            <Link
              href="#nav"
              style={{
                display: "inline-block",
                padding: "16px 32px",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "rgba(200,220,255,0.85)",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Enter Archive →
            </Link>
          </motion.div>

          <motion.button
            onClick={toggleAudio}
            whileHover={{ scale: 1.04 }}
            style={{
              background: "transparent",
              border: "1px solid rgba(100,180,255,0.18)",
              padding: "8px 24px",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              color: isPlaying ? "rgba(0,255,200,0.8)" : "rgba(150,180,220,0.6)",
              cursor: "pointer",
              fontFamily: "monospace",
              transition: "color 0.3s",
            }}
          >
            {isPlaying ? "▐▐ PAUSE DNB" : "▶ PLAY DNB"}
          </motion.button>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <div style={{ width: 1, height: 40, background: "rgba(120,180,255,0.3)" }} />
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(120,180,255,0.5)",
              fontFamily: "monospace",
            }}
          >
            scroll
          </span>
        </motion.div>
      </section>

      {/* ── NAV GRID ────────────────────────────────────────────────────────── */}
      <section
        id="nav"
        style={{
          position: "relative",
          zIndex: 10,
          padding: "96px 24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 1,
            maxWidth: 1200,
            margin: "0 auto",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navItems.map((item, idx) => (
            <NavCard key={item.href} item={item} idx={idx} />
          ))}
        </div>
      </section>

      {/* ── REFLECTION ──────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 112,
          paddingBottom: 112,
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* BIG BACKGROUND TEXT */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            fontStyle: "italic",
            color: "rgba(255,255,255,0.015)",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
        >
          REFLECT
        </div>

        <p
          style={{
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.4em",
            color: "rgba(100,180,255,0.7)",
            fontFamily: "monospace",
            position: "relative",
            zIndex: 1,
          }}
        >
          Current Reflection
        </p>

        <AnimatePresence mode="wait">
          <motion.p
            key={reflection}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "1.2rem",
              fontStyle: "italic",
              maxWidth: 680,
              margin: "40px auto 0",
              color: "rgba(200,215,230,0.75)",
              lineHeight: 1.7,
              position: "relative",
              zIndex: 1,
            }}
          >
            "{reflection}"
          </motion.p>
        </AnimatePresence>

        {/* TIMESTAMP */}
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            marginTop: 32,
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "rgba(100,140,180,0.5)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC
        </motion.p>
      </section>

      {/* ── SECRET MODAL ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {secret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.97)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 24,
            }}
          >
            {/* GLITCH STATIC IN BACKGROUND */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,200,0.015) 1px, rgba(0,255,200,0.015) 2px)",
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: "monospace",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  color: "rgba(0,255,200,0.8)",
                  marginBottom: 40,
                }}
              >
                Hidden Archive
              </motion.p>

              <GlitchText
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 3rem)",
                  display: "block",
                  color: "#d4d8e0",
                  marginBottom: 24,
                  fontFamily: "Georgia, serif",
                }}
              >
                Nothing Remains Archived Forever
              </GlitchText>

              <p
                style={{
                  color: "rgba(150,165,180,0.65)",
                  maxWidth: 480,
                  margin: "0 auto",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                The Ocean Keeps Every Signal Somewhere Beneath The Surface.
              </p>

              <motion.button
                onClick={() => { setSecret(false); setClicks(0); }}
                whileHover={{ scale: 1.05, borderColor: "rgba(100,255,200,0.4)" }}
                style={{
                  marginTop: 40,
                  background: "transparent",
                  border: "1px solid rgba(100,180,255,0.25)",
                  padding: "12px 28px",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "rgba(200,220,255,0.8)",
                  cursor: "pointer",
                  fontFamily: "monospace",
                }}
              >
                Return To Archive
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ─── NAV CARD ─────────────────────────────────────────────────────────────────

function NavCard({ item, idx }: { item: (typeof navItems)[0]; idx: number }) {
  const [hovered, setHovered] = useState(false);
  const [scanY, setScanY] = useState(0);

  useEffect(() => {
    if (!hovered) return;
    let frame: number;
    let y = 0;
    const animate = () => {
      y = (y + 1.5) % 100;
      setScanY(y);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: hovered ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.01)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Link
        href={item.href}
        style={{
          display: "block",
          padding: "40px 32px",
          textDecoration: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* INDEX */}
        <span
          style={{
            display: "block",
            fontFamily: "monospace",
            fontSize: 10,
            color: "rgba(80,160,255,0.45)",
            letterSpacing: "0.3em",
            marginBottom: 20,
          }}
        >
          {String(idx + 1).padStart(2, "0")} ·
        </span>

        <h2
          style={{
            fontSize: "1.7rem",
            fontStyle: "italic",
            fontWeight: 400,
            color: hovered ? "#e8edf5" : "#c8d0dc",
            transition: "color 0.2s",
            marginBottom: 12,
          }}
        >
          {hovered ? (
            <GlitchText>{item.label}</GlitchText>
          ) : (
            item.label
          )}
        </h2>

        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(140,155,170,0.7)",
            letterSpacing: "0.04em",
          }}
        >
          {item.sub}
        </p>

        {/* HOVER ARROW */}
        <motion.span
          animate={{ x: hovered ? 0 : -10, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            display: "block",
            marginTop: 24,
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "rgba(80,160,255,0.7)",
            fontFamily: "monospace",
          }}
        >
          ENTER →
        </motion.span>
      </Link>

      {/* SCAN LINE ON HOVER */}
      {hovered && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${scanY}%`,
            height: 1,
            background: "rgba(80,180,255,0.25)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* CORNER ACCENT */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 20,
          height: 20,
          borderTop: "1px solid rgba(80,160,255,0.2)",
          borderRight: "1px solid rgba(80,160,255,0.2)",
          pointerEvents: "none",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />
    </motion.div>
  );
}
