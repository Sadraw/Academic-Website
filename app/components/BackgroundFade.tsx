"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function BackgroundFade() {
  const { theme } = useTheme();

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        opacity: theme === "dark" ? 1 : 0,
      }}
      transition={{
        duration: 0.9,
        ease: "easeInOut",
      }}
      style={{
        backgroundColor: "#18181b", // zinc-900
      }}
    />
  );
}