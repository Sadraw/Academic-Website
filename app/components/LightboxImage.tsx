"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

type LightboxImageProps = {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  date?: string;
  description?: string;
};

export function LightboxImage({
  src,
  alt,
  isOpen,
  onClose,
  title,
  date,
  description,
}: LightboxImageProps) {
  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0
            z-50
            flex items-center justify-center
            bg-black/60
            backdrop-blur-md
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* content */}
          <motion.div
            className="
              relative
              max-w-5xl
              w-[90%]
              bg-transparent
            "
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >


            {/*Close Button */}
            <button
            onClick={onClose}
            className="
            absolute top-3 right-3
            z-10
            text-white/80 hover:text-white
            bg-black/30 hover:bg-black/50
            rounded-full
            w-9 h-9 
            flex items-center justify-center
            transition
            hover:cursor-pointer

            "
            >

                ✕
 
            </button>
            
            
            
            
            {/* Image */}
            <div className="relative w-full aspect-3/2 overflow-hidden rounded-xl shadow-2xl">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* metadata */}
            {(title || date || description) && (
              <div className="mt-4 text-center text-zinc-300 dark:text-zinc-100  font-serif">
                {title && <h2 className="text-lg">{title}</h2>}
                {date && <p className="text-sm opacity-70">{date}</p>}
                {description && (
                  <p className="text-sm mt-2 opacity-80">{description}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}