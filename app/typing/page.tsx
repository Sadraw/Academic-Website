"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const SENTENCES = [
  "The Archive Remembers Everything Even When I Forget.",
  "Memory Is A Glitching Ocean That Never Stops Moving.",
  "I Keep Typing Thoughts That No Longer Belong To Me.",
  "Digital Silence Feels Louder Than Real Conversations Sometimes.",
  "Every Sentence Breaks A Little More When You Read It Again.",
  "We Are Just Fragments Inside A Slower Conversation With Time.",
  "The Screen Reflects More Of Me Than I Want To Admit.",
  "I Write In Circles Because Straight Lines Feel Too Final."
];

type Score = {
  name: string;
  wpm: number;
  accuracy: number;
  correct: number;
  wrong: number;
};

export default function TypingPage() {
  const [username, setUsername] = useState("");
  const [locked, setLocked] = useState(false);

  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [time, setTime] = useState(15);

  const [correct, setCorrect] = useState(0);
  const [wrong] = useState(0);

  const [scores, setScores] = useState<Score[]>([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const sentence = SENTENCES[index];

  /* LOAD SCOREBOARD */
  const loadScores = () => {
    const stored = JSON.parse(
      localStorage.getItem("typing-scores") || "[]"
    );
    setScores(stored);
  };

  useEffect(() => {
    loadScores();
  }, []);

  /* TIMER */
  useEffect(() => {
    if (!started || finished) return;

    const t = setInterval(() => {
      setTime((p) => {
        if (p <= 1) {
          clearInterval(t);
          endGame();
          return 0;
        }
        return p - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, [started, finished]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  /* INPUT */
  const handleChange = (val: string) => {
    if (!started) setStarted(true);

    setInput(val);

    if (val === sentence) {
      setCorrect((c) => c + 1);
      setInput("");
      setIndex((i) => i + 1);
    }
  };

  /* END GAME */
  const endGame = () => {
    if (finished) return;

    const accuracy =
      correct === 0 ? 0 : Math.round((correct / (correct + 0)) * 100);

    const wpm = correct * 10;

    const newScore: Score = {
      name: username || "Anon",
      wpm,
      accuracy,
      correct,
      wrong: 0
    };

    const stored = JSON.parse(
      localStorage.getItem("typing-scores") || "[]"
    );

    const updated = [newScore, ...stored].slice(0, 10);

    localStorage.setItem("typing-scores", JSON.stringify(updated));

    setScores(updated);
    setFinished(true);
  };

  const reset = () => {
    setInput("");
    setIndex(0);
    setTime(15);
    setStarted(false);
    setFinished(false);
    setCorrect(0);
    loadScores();
  };

  const accuracy =
    correct === 0 ? 0 : Math.round((correct / correct) * 100);

  const wpm = correct * 10;

  return (
    <main className="min-h-screen bg-[#071019] text-white flex items-center justify-center font-serif relative overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08131d] via-[#0a1c2c] to-[#04070d]" />

      {/* glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        animate={{ x: [0, 80, -80, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, rgba(120,180,255,0.12), transparent 70%)",
          filter: "blur(90px)"
        }}
      />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">

        {/* USERNAME */}
        {!locked && (
          <div>
            <h2 className="text-blue-200 text-xs uppercase tracking-[0.3em] mb-4">
              Username
            </h2>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 bg-black/30 border border-blue-200/20 w-full text-center"
              placeholder="Enter name"
            />

            <button
              onClick={() => setLocked(true)}
              className="mt-4 border px-6 py-2 text-xs uppercase"
            >
              Start
            </button>
          </div>
        )}

        {locked && (
          <>
            {/* TIMER */}
            <div className="text-blue-200 text-xs tracking-[0.4em] mb-6">
              Time: {time}s
            </div>

            {/* SENTENCE (🔥 FIXED LIVE GREEN SYSTEM) */}
            {!finished && (
              <div className="text-2xl md:text-3xl mb-10 leading-relaxed">
                {sentence.split("").map((char, i) => {
                  const typed = input[i];

                  let color = "text-zinc-500";

                  if (typed != null) {
                    color =
                      typed === char
                        ? "text-green-300"
                        : "text-red-400";
                  }

                  return (
                    <span
                      key={i}
                      className={`${color} transition-colors duration-100`}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>
            )}

            {/* INPUT */}
            {!finished && (
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full p-4 bg-black/30 border border-blue-200/20 text-center"
                placeholder="Type here..."
              />
            )}

            {/* RESULTS */}
            <AnimatePresence>
              {finished && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-10 space-y-6"
                >
                  <div className="text-3xl">🐝🍉🐝🍉🐝🍉</div>

                  <h2>Session Complete</h2>

                  <p>Player: {username}</p>
                  <p className="text-green-300">Correct: {correct}</p>
                  <p className="text-blue-200">Accuracy: {accuracy}%</p>
                  <p className="text-blue-200">WPM: {wpm}</p>

                  {/* SCOREBOARD */}
                  <div className="border border-blue-200/20 p-4 mt-6">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-blue-200 mb-3">
                      Scoreboard
                    </h3>

                    {scores.length === 0 ? (
                      <p className="text-zinc-500">No scores yet</p>
                    ) : (
                      scores.map((s, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-sm"
                        >
                          <span>
                            {i + 1}. {s.name}
                          </span>
                          <span className="text-blue-200">
                            WPM {s.wpm}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <button
                    onClick={reset}
                    className="border px-6 py-3 uppercase text-xs"
                  >
                    Try Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* AUTO END */}
            {!finished && index >= SENTENCES.length && endGame()}
          </>
        )}
      </div>
    </main>
  );
}