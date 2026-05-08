"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: 0.2,
      }}
      className="
        min-h-screen
        flex
        flex-col
        items-center
        text-center
        font-serif
        bg-[#98A869]
        dark:bg-zinc-900
        transition-colors
        duration-300
        px-6
        pt-32
      "
    >
      {/* Main Hero Section */}




{/* Navigation */}

      <nav
        className="
          flex
          flex-wrap
          justify-center
          gap-6
          text-[1.05rem]
          text-[#2F5D50]
          dark:text-zinc-400
          mb-12
        "
      >
        <Link
          href="/papers"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          Publications
        </Link>

        <Link
          href="/media"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          Media
        </Link>

        <Link
          href="/archive"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          Archive
        </Link>

        <Link
          href="/contact"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          Contact
        </Link>

        <Link
          href="/cv"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          CV
        </Link>

        <a
          href="https://github.com/Sadraw"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity duration-200"
        >
          GitHub
        </a>
      </nav>
      

      {/* Divider */}

      <div className="w-24 h-px bg-[#2F5D50]/40 mb-6" />



      {/* Reflection Section */}
<section
  className="
    max-w-2xl
    mt-4
    px-6
  "
>
      <p
      className="
        mt-4
        text-[0.9rem]
        tracking-[2px]
        uppercase
        text-[#2F5D50]
        dark:text-zinc-200
      "
    >
      Current Reflections
    </p>
  <div
    className="
      border-l
      border-r
      border-[#2F5D50]/40
      pl-6
      py-2
    "
  >
    <p
      className="
        italic
        leading-relaxed
        text-[1.05rem]
        text-[#353735]
        dark:text-[#56a891]
      "
    >
      “Listening to <span className="opacity-80 animate-pulse">Motion Picture
      Soundtrack</span>, Reflecting on Digital Melancholy, Fragmented
      Identity, and The Emotional Residue Left Behind by Online Spaces.”
    </p>


  </div>
</section>
      {/* Divider */}

      <div className="w-24 h-px bg-[#2F5D50]/40 mb-5 mt-6" />

      
      <h1
      className="
        text-[2.5rem]
        tracking-[2px]
        mb-3
        text-[#404240]
        dark:text-[#98A869]
        animate-pulse
        drop-shadow-[0_0_10px_rgba(255,255,230,0.22)]
      "
      >
          Sadra Daneshmand
          
      </h1>
      
      
      <p
        className="
          text-[1.15rem]
          mb-6
          text-[#3f403f]
          dark:text-zinc-300
        "
      >
        MA English Studies · Discourse · Media · Language
      </p>

      {/* Divider */}

      <div className="w-24 h-px bg-[#2F5D50]/40 mb-8" />




      {/* Academic Bio */}

      

      <p
        className="
          max-w-2xl
          leading-relaxed
          text-[1.02rem]
          text-[#3c3d3c]
          dark:text-zinc-300
          mb-12
        "
      >
        Researching Discourse, Digital Media, and Contemporary Language
        Practices. Interested in Cultural Narratives, Online Communication,
        Visual Media, and the Emotional Textures of Digital Life.
      </p>

      
    </motion.main>
  );
}