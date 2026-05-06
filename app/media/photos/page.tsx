"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { LightboxImage } from "../../components/LightboxImage";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { photos } from "./photos.data";
import { Navbar } from "@/app/components/Navbar";

export default function PhotosPage() {
  const [selected, setSelected] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        z-10
        p-3
        rounded-full
        backdrop-blur
        bg-black/30
        text-white
        dark:bg-white/80
        dark:text-black/30
        transition-all
        duration-200
        hover:bg-black/60
        dark:hover:bg-[#98A869]
        hover:scale-110
        hover:cursor-pointer
        active:scale-95
        ${direction === "left" ? "-left-6" : "-right-6"}
      `}
    >
      {icon}
    </button>
  );

  return (

    <main
      className="
        min-h-screen
        px-8
        py-16
        bg-[#98A869]
        dark:bg-zinc-900
        font-serif
        text-center
      "
    >
      {/* PAGE FADE-IN (same as MediaPage) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        className="pt-12 flex flex-col items-center"
      >
        <div className="mt-2">
          <Navbar/>

        </div>

        
        {/* Header */}
        <h1 className="text-[2.3rem] mt-8 mb-10 tracking-[1px]">
          <Link
            href="/media"
            className="text-[#1F2520] dark:text-[#98A869] hover:opacity-65 transition"
          >
            ← Photos
          </Link>
        </h1>

        {/* GALLERY ANIMATION (same idea as image block) */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.9,
          }}
          className="relative w-full max-w-6xl px-10"
        >
          {/* LEFT ARROW */}
          <ArrowButton
            direction="left"
            icon={<ChevronLeft size={22} />}
          />

          {/* RIGHT ARROW */}
          <ArrowButton
            direction="right"
            icon={<ChevronRight size={22} />}
          />

          {/* SCROLL AREA */}
          <div
            ref={scrollRef}
            className="
              flex
              gap-6
              px-6
              overflow-x-auto
              scroll-smooth
              snap-x
              snap-mandatory
              hide-scrollbar
            "
          >
            {photos.map((photo, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelected(photo)}
                className="shrink-0 w-[25%] cursor-pointer snap-center"
              >
                <div className="relative aspect-1/2 w-full overflow-hidden rounded-xl shadow-lg">
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
        </motion.div>
      </motion.div>

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