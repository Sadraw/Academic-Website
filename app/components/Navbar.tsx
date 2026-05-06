"use client";

import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/media", label: "Media" },
  { href: "/media/photos", label: "Photos" },
  { href: "/media/videos", label: "Videos" },
  { href: "/media/songs", label: "Songs" },

];

export function Navbar() {
  return (
    <nav className="w-full flex justify-center pt-6">
      <div className="flex gap-10 text-[1.05rem] tracking-wide font-serif">
        {links.map((link) => (
          <div key={link.href} className="group relative">
            <Link
              href={link.href}
              className="
                text-[#1F2520]
                dark:text-[#98A869]
                transition
                hover:opacity-80
              "
            >
              <span className="relative z-10">{link.label}</span>

              {/* underline */}
              <span
                className="
                  absolute
                  left-0
                  bottom-0
                  h-[1px]
                  w-0
                  bg-current
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />

              {/* glow */}
              <span
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  h-[40%]
                  w-full
                  -translate-y-1/2
                  -translate-x-full
                  bg-linear-to-r
                  from-transparent
                  via-white/60
                  to-transparent
                  blur-sm
                  opacity-0
                  group-hover:opacity-40
                  group-hover:translate-x-full
                  transition-all
                  duration-1000
                  ease-out
                "
              />
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
}