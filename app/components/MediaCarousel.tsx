"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MediaItem = {
  id?: string;
  src?: string;
  title: string;
  date?: string;
  description?: string;
};

type Props = {
  items: MediaItem[];
  type: "video" | "photo" | "soundcloud";
  renderItem: (item: MediaItem) => React.ReactNode;
};

export function MediaCarousel({ items, renderItem }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left:
        dir === "left"
          ? -scrollRef.current.offsetWidth * 0.9
          : scrollRef.current.offsetWidth * 0.9,
      behavior: "smooth",
    });
  };

  const Arrow = ({
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
        cursor-pointer
        active:scale-95
        ${direction === "left" ? "-left-14" : "-right-14"}
      `}
    >
      {icon}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative w-full max-w-3xl"
    >
      <Arrow direction="left" icon={<ChevronLeft size={26} />} />
      <Arrow direction="right" icon={<ChevronRight size={26} />} />

      <div
        ref={scrollRef}
        className="
          flex
          gap-10
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          hide-scrollbar
          px-6
        "
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="shrink-0 w-full snap-center"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </motion.div>
  );
}