"use client";
import {motion} from "framer-motion";

import { useState } from "react";

export function EmailCopy() {
  const email = "sadrawdaneshmand@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="
        mt-6
        flex items-center gap-4
        px-4 py-2
        rounded-full
        border border-black/10 dark:border-white/10
        bg-[#1F2520]/10 dark:bg-white/10
        backdrop-blur-md
      "
    >
      {/* Email (NOT clickable) */}
      <span className="text-[#1F2520] dark:text-zinc-100 text-[0.95rem]">
        ✉ {email}
      </span>

      {/* Copy button ONLY */}
      <motion.button
      whileHover={{ scale: 1.1}}
      whileTap={{ scale: 0.9}}
        onClick={copyEmail}
        className="
        text-sm
        opacity-60 hover:opacity-100
        cursor-pointer
        px-3 py-1
        rounded-full
        border border-black/10 dark:border-white/10
        bg-white/20 dark:bg-black/20
        transition-all duration-150 ease-in-out
        hover:scale-[1.05]
      hover:bg-white/30 dark:hover:bg-black/30
        hover:shadow-sm hover:shadow-black/10 dark:hover:shadow-white/10

        active:scale-[0.97]
"
      >
        <span 
        className=
        "relative inline-block w-17.5 text-center">
            
            {copied ? "✓ copied" : "copy"}

        </span>

      </motion.button>

    </div>
  );
}