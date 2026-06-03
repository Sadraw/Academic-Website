"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { songs } from "./soundcloud.data";

// ─── GLITCH TEXT ──────────────────────────────────────────────────────────────

function GlitchText({
  children,
  className = "",
  style = {},
  always = false,
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  always?: boolean;
}) {
  const [glitching, setGlitching] = useState(false);
  const [o1, setO1] = useState({ x: 0, y: 0 });
  const [o2, setO2] = useState({ x: 0, y: 0 });
  const [sliceY, setSliceY] = useState(50);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const fire = () => {
      setGlitching(true);
      setO1({ x: (Math.random() - 0.5) * 16, y: (Math.random() - 0.5) * 6 });
      setO2({ x: (Math.random() - 0.5) * -12, y: (Math.random() - 0.5) * 4 });
      setSliceY(15 + Math.random() * 65);
      t = setTimeout(() => {
        setGlitching(false);
        t = setTimeout(fire, always ? 400 + Math.random() * 800 : 2000 + Math.random() * 4000);
      }, 80 + Math.random() * 140);
    };
    t = setTimeout(fire, always ? 200 + Math.random() * 600 : 800 + Math.random() * 2000);
    return () => clearTimeout(t);
  }, [always]);

  const active = glitching;
  return (
    <span className={className} style={{ position: "relative", display: "inline-block", ...style }}>
      <span aria-hidden style={{
        position: "absolute", inset: 0,
        color: "rgba(0,255,200,0.5)",
        transform: active ? `translate(${o1.x}px,${o1.y}px)` : "none",
        clipPath: active ? `polygon(0 0,100% 0,100% ${sliceY}%,0 ${sliceY}%)` : "none",
        mixBlendMode: "screen", pointerEvents: "none", userSelect: "none",
      }}>{children}</span>
      <span aria-hidden style={{
        position: "absolute", inset: 0,
        color: "rgba(255,30,90,0.4)",
        transform: active ? `translate(${o2.x}px,${o2.y}px)` : "none",
        clipPath: active ? `polygon(0 ${sliceY}%,100% ${sliceY}%,100% 100%,0 100%)` : "none",
        mixBlendMode: "screen", pointerEvents: "none", userSelect: "none",
      }}>{children}</span>
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
}

// ─── SCANLINES ────────────────────────────────────────────────────────────────

function Scanlines() {
  return (
    <div aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 99, pointerEvents: "none",
      backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
    }} />
  );
}

// ─── NOISE CANVAS ─────────────────────────────────────────────────────────────

function NoiseOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const tick = () => {
      const id = ctx.createImageData(c.width, c.height);
      for (let i = 0; i < id.data.length; i += 4) {
        const v = Math.random() > 0.5 ? Math.floor(Math.random() * 255) : 0;
        id.data[i] = id.data[i+1] = id.data[i+2] = v;
        id.data[i+3] = Math.random() * 16;
      }
      ctx.putImageData(id, 0, 0);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.3 }} />;
}

// ─── GLITCH BARS ─────────────────────────────────────────────────────────────

function GlitchBars() {
  const [bars, setBars] = useState<{ id: number; y: number; h: number; color: string; dx: number }[]>([]);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const fire = () => {
      const n = Math.floor(Math.random() * 5) + 1;
      setBars(Array.from({ length: n }, (_, i) => ({
        id: Date.now() + i,
        y: Math.random() * 100,
        h: 1 + Math.random() * 14,
        color: Math.random() > 0.5 ? "rgba(0,255,200,0.1)" : "rgba(255,30,90,0.08)",
        dx: (Math.random() - 0.5) * 8,
      })));
      setTimeout(() => setBars([]), 60 + Math.random() * 100);
      t = setTimeout(fire, 500 + Math.random() * 2000);
    };
    t = setTimeout(fire, 800);
    return () => clearTimeout(t);
  }, []);
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" }}>
      {bars.map(b => (
        <div key={b.id} style={{
          position: "absolute", top: `${b.y}%`, left: `${b.dx}%`,
          width: "100%", height: b.h, background: b.color, mixBlendMode: "screen",
        }} />
      ))}
    </div>
  );
}

// ─── WAVEFORM CANVAS (reactive bars) ─────────────────────────────────────────

function WaveformBg() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let raf: number; let t = 0;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      const { width: w, height: h } = c;
      ctx.clearRect(0, 0, w, h);
      const bars = 120;
      const bw = w / bars;
      for (let i = 0; i < bars; i++) {
        const x = i * bw;
        const wave =
          Math.sin(i * 0.25 + t * 0.06) * 55 +
          Math.cos(i * 0.12 + t * 0.04) * 35 +
          Math.sin(i * 0.5 + t * 0.09) * 20;
        const barH = 80 + wave;
        const pct = i / bars;
        // color: cyan → teal → green tones to match the site palette
        const r = Math.floor(0 + pct * 30);
        const g = Math.floor(200 + pct * 40);
        const bb = Math.floor(180 - pct * 60);
        ctx.fillStyle = `rgba(${r},${g},${bb},${0.06 + Math.abs(Math.sin(i * 0.3 + t * 0.05)) * 0.08})`;
        ctx.fillRect(x, h / 2 - barH / 2, bw * 0.55, barH);
        // mirror bottom
        ctx.fillStyle = `rgba(${r},${g},${bb},0.03)`;
        ctx.fillRect(x, h / 2 + barH / 2, bw * 0.55, 2);
      }
      t++;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 1 }} />;
}

// ─── SONG CARD ────────────────────────────────────────────────────────────────

function SongCard({ song, idx, active }: {
  song: { title: string; releasedAt: string; description: string; url: string };
  idx: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [scanY, setScanY] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!hovered) return;
    let raf: number; let y = 0;
    const go = () => { y = (y + 2) % 100; setScanY(y); raf = requestAnimationFrame(go); };
    raf = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06, duration: 0.5 }}
      style={{
        flexShrink: 0,
        width: "100%",
        scrollSnapAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* CARD WRAPPER */}
      <div style={{
        position: "relative",
        width: "85%",
        maxWidth: 680,
        overflow: "hidden",
        border: hovered ? "1px solid rgba(0,220,180,0.35)" : "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.3s",
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(16px)",
      }}>
        {/* TOP LABEL BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{
            fontFamily: "monospace", fontSize: 9, letterSpacing: "0.35em",
            textTransform: "uppercase", color: "rgba(0,220,180,0.6)",
          }}>
            TRACK_{String(idx + 1).padStart(3, "0")}
          </span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
            style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)" }}
          >
            {song.releasedAt}
          </motion.span>
        </div>

        {/* IFRAME */}
        <div style={{ position: "relative" }}>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            onLoad={() => setLoaded(true)}
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(song.url)}&color=%2300dcb4&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
            style={{ display: "block" }}
          />
          {!loaded && (
            <div style={{
              position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: "rgba(0,220,180,0.7)" }}
              >
                [ LOADING SIGNAL ]
              </motion.span>
            </div>
          )}
        </div>

        {/* BOTTOM META */}
        <div style={{ padding: "14px 16px 16px" }}>
          <p style={{
            fontSize: "1.05rem",
            color: "rgba(220,230,240,0.85)",
            fontStyle: "italic",
            marginBottom: 6,
            fontFamily: "Georgia, serif",
          }}>
            {hovered ? <GlitchText always>{song.title}</GlitchText> : song.title}
          </p>
          <p style={{
            fontSize: "0.8rem",
            color: "rgba(160,175,190,0.6)",
            lineHeight: 1.5,
            fontFamily: "monospace",
            letterSpacing: "0.02em",
          }}>
            {song.description}
          </p>
        </div>

        {/* CORNER ACCENTS */}
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
          "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
          <div key={i} aria-hidden style={{
            position: "absolute",
            ...(cls.includes("top-0") ? { top: 0 } : { bottom: 0 }),
            ...(cls.includes("left-0") ? { left: 0 } : { right: 0 }),
            width: 12, height: 12,
            borderTop: cls.includes("border-t") ? "1px solid rgba(0,220,180,0.45)" : undefined,
            borderBottom: cls.includes("border-b") ? "1px solid rgba(0,220,180,0.45)" : undefined,
            borderLeft: cls.includes("border-l") ? "1px solid rgba(0,220,180,0.45)" : undefined,
            borderRight: cls.includes("border-r") ? "1px solid rgba(0,220,180,0.45)" : undefined,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }} />
        ))}

        {/* HOVER SCAN LINE */}
        {hovered && (
          <div aria-hidden style={{
            position: "absolute", left: 0, right: 0, top: `${scanY}%`,
            height: 1, background: "rgba(0,220,180,0.2)", pointerEvents: "none",
          }} />
        )}
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SongsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dragging, setDragging] = useState(false);

  const sortedSongs = useMemo(
    () => [...songs].sort((a, b) => new Date(b.releasedAt).getTime() - new Date(a.releasedAt).getTime()),
    []
  );

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const next = dir === "left"
      ? Math.max(0, activeIdx - 1)
      : Math.min(sortedSongs.length - 1, activeIdx + 1);
    setActiveIdx(next);
    const card = scrollRef.current.children[next] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  // track active card on scroll
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    const onScroll = () => {
      const w = el.offsetWidth;
      const idx = Math.round(el.scrollLeft / w);
      setActiveIdx(idx);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{
      position: "relative",
      minHeight: "100vh",
      background: "#040c10",
      color: "#d0d8e0",
      fontFamily: "Georgia, serif",
      textAlign: "center",
      overflow: "hidden",
      cursor: "crosshair",
    }}>

      {/* CINEMATIC LAYERS */}
      <Scanlines />
      <NoiseOverlay />
      <GlitchBars />

      {/* LETTERBOX */}
      {[{ top: 0 }, { bottom: 0 }].map((pos, i) => (
        <div key={i} aria-hidden style={{
          position: "fixed", left: 0, right: 0, height: 44,
          background: "#000", zIndex: 50, pointerEvents: "none", ...pos,
        }} />
      ))}

      {/* VIGNETTE */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.78) 100%)",
      }} />

      {/* WAVEFORM BG */}
      <WaveformBg />

      {/* DEEP TEAL GLOW */}
      <div aria-hidden style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(0,180,140,0.07) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 20, paddingTop: 48, paddingBottom: 80, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* NAVBAR */}
        <div style={{ position: "relative", zIndex: 30, width: "100%" }}>
          <Navbar />
        </div>

        {/* SYSTEM TAG */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{
            fontFamily: "monospace", fontSize: 9, letterSpacing: "0.45em",
            textTransform: "uppercase", color: "rgba(0,220,180,0.55)",
            marginTop: 24, marginBottom: 16,
          }}
        >
          [ audio archive · {sortedSongs.length} transmissions ]
        </motion.p>

        {/* BACK LINK + TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", marginBottom: 12, letterSpacing: "0.01em" }}
        >
          <Link href="/media" style={{
            color: "rgba(0,220,180,0.85)",
            textDecoration: "none",
            fontStyle: "italic",
          }}>
            <GlitchText>← Music</GlitchText>
          </Link>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: "1rem",
            color: "rgba(180,195,210,0.6)",
            marginBottom: 40,
            letterSpacing: "0.04em",
            maxWidth: 520,
          }}
        >
          A Growing Archive of Original Music and Sonic Experiments.
        </motion.p>

        {/* ── CAROUSEL ─────────────────────────────────────────────────── */}
        <div style={{ position: "relative", width: "100%", maxWidth: 900 }}>

          {/* NAV ARROWS */}
          {[
            { dir: "left" as const, style: { left: 0 } },
            { dir: "right" as const, style: { right: 0 } },
          ].map(({ dir, style }) => (
            <motion.button
              key={dir}
              onClick={() => scroll(dir)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 30,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(0,220,180,0.25)",
                color: "rgba(0,220,180,0.8)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(8px)",
                ...style,
              }}
            >
              {dir === "left" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
            </motion.button>
          ))}

          {/* SCROLL TRACK */}
          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: 40,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              padding: "8px 40px 16px",
            }}
          >
            {sortedSongs.map((song, i) => (
              <SongCard key={i} song={song} idx={i} active={i === activeIdx} />
            ))}
          </div>

          {/* DOT INDICATORS */}
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 20 }}>
            {sortedSongs.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setActiveIdx(i);
                  const card = scrollRef.current?.children[i] as HTMLElement;
                  card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                }}
                animate={{
                  width: i === activeIdx ? 20 : 6,
                  background: i === activeIdx ? "rgba(0,220,180,0.8)" : "rgba(255,255,255,0.2)",
                }}
                style={{
                  height: 6,
                  borderRadius: 3,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* CURRENT TRACK READOUT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: 32,
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(0,200,160,0.5)",
            }}
          >
            NOW VIEWING · {String(activeIdx + 1).padStart(2, "0")} / {String(sortedSongs.length).padStart(2, "0")}
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM TIMESTAMP */}
        <motion.p
          animate={{ opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            marginTop: 48,
            fontFamily: "monospace",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: "rgba(100,140,160,0.45)",
          }}
        >
          {new Date().toISOString().replace("T", " ").slice(0, 19)} UTC · SIGNAL ARCHIVE v2
        </motion.p>
      </motion.div>
    </main>
  );
}
