"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        relative p-2 rounded-full
        bg-[#97a769] dark:bg-zinc-900
        text-gray-800 dark:text-gray-100
        transition-colors duration-500
        shadow-sm
        cursor-pointer
        
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -40, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 40, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            ☀️
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 40, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -40, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            🌙
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}