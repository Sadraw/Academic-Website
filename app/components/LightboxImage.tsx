"use client";

import { useState } from "react";
import Image from "next/image";
type Props = {
  src: string;
  alt?: string;
  location?: string;
  year?: string;
};

export function LightboxImage({ src, alt, location, year }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <Image
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-xl shadow-lg w-full h-auto transition hover:scale-[1.01]"
      />

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center"
          >
            <Image
              src={src}
              alt={alt}
              className="max-w-[90vw] max-h-[70vh] rounded-lg shadow-xl"
            />

            <p className="mt-4 text-sm text-white/80">
              {location} {year && `· ${year}`}
            </p>
          </div>
        </div>
      )}
    </>
  );
}