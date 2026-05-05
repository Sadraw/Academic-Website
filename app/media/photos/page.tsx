"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { LightboxImage } from "../../components/LightboxImage";
import { ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    src: "/images/the-man-in-the-sun.jpg",
    title: "The Man in the Sun",
    date: "29.04.2026",
    description: "Captured during a late afternoon near the university",
  },
  {
    src: "/images/the-man-in-the-sun.jpg",
    title: "Second Frame",
    date: "30.04.2026",
    description: "A quiet moment in motion",
  },
  {
    src: "/images/the-man-in-the-sun.jpg",
    title: "Third Frame",
    date: "01.05.2026",
    description: "Light and shadow study",
  },
  {
    src: "/images/the-man-in-the-sun.jpg",
    title: "Fourth Frame",
    date: "02.05.2026",
    description: "Evening atmosphere study",
  },
];

export default function PhotosPage() {
  const [selected, setSelected] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = scrollRef.current.offsetWidth * 0.8;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#98A869]
        dark:bg-zinc-900
        font-serif
        px-8
        py-16
        flex
        flex-col
        items-center
        text-center
      "
    >
      {/* Header */}
      <h1 className="text-3xl mb-10">
        <Link href="/media" className="hover:opacity-60 transition">
          ← Media / Photos
        </Link>
      </h1>

      {/* Gallery wrapper */}
      <div className="relative w-full max-w-6xl">

        {/* LEFT ARROW */}
        <button
          onClick={() => scroll("left")}
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2
            z-10
            bg-black/30
            hover:bg-black/50
            text-white
            p-3
            rounded-full
            backdrop-blur
            transition
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() => scroll("right")}
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2
            z-10
            bg-black/30
            hover:bg-black/50
            text-white
            p-3
            rounded-full
            backdrop-blur
            transition
          "
        >
          <ChevronRight size={22} />
        </button>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="
            w-full
            overflow-x-auto
            flex
            gap-6
            px-6
            scroll-smooth
            snap-x
            snap-mandatory
          "
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(photo)}
              className="
                flex-shrink-0
                w-[32%]
                cursor-pointer
                snap-center
              "
            >
              <div
                className="
                  relative
                  aspect-[3/2]
                  w-full
                  overflow-hidden
                  rounded-xl
                  shadow-lg
                "
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selected && (
        <LightboxImage
          isOpen={!!selected}
          onClose={() => setSelected(null)}
          src={selected.src}
          title={selected.title}
          date={selected.date}
          description={selected.description}
          alt={selected.title}
        />
      )}
    </main>
  );
}