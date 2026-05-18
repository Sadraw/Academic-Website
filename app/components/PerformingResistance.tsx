"use client";

import { useEffect, useState } from "react";

export default function PerformingResistanceSlideshow() {
  const [current, setCurrent] = useState(0);
  const slides = Array.from({ length: 17 });

  const next = () => setCurrent((c) => Math.min(c + 1, slides.length - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      if (e.key === "ArrowLeft") prev();
    };

    const onClick = (e: MouseEvent) => {
      if (e.clientX > window.innerWidth / 2) next();
      else prev();
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const renderSlide = () => {
    switch (current) {
      case 0:
        return (
          <div className="text-center text-white">
            <h1 className="text-5xl font-serif italic">
              Waiting for Godot in Sarajevo
            </h1>
            <p className="mt-4 text-sm opacity-70">
              Theatre Studies — Academic Presentation
            </p>
          </div>
        );

      case 1:
        return (
          <div className="text-center text-white max-w-xl">
            <h2 className="text-4xl font-serif">Why perform theatre in war?</h2>
            <p className="mt-6 opacity-80">
              When bombs fall and silence is enforced, some choose to stand on a stage.
            </p>
          </div>
        );

      case 2:
        return (
          <div className="text-white text-center">
            <h2 className="text-4xl">Yugoslavia after 1991</h2>
            <ul className="mt-6 space-y-2 opacity-80">
              <li>Collapse of federal state</li>
              <li>Ethnic fragmentation and civil war</li>
              <li>Art becomes survival</li>
            </ul>
          </div>
        );

      default:
        return (
          <div className="text-white text-center opacity-70">
            Slide {current + 1}
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* progress */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-orange-600 transition-all"
        style={{ width: `${((current + 1) / slides.length) * 100}%` }}
      />

      {/* counter */}
      <div className="absolute bottom-6 right-6 text-xs text-white/60">
        {String(current + 1).padStart(2, "0")} / {slides.length}
      </div>

      {/* slide */}
      <div className="flex items-center justify-center w-full h-full">
        {renderSlide()}
      </div>
    </div>
  );
}