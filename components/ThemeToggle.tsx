"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-slate-800/50 border border-slate-700/60 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === "dark" || theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-2 rounded-xl bg-slate-800/80 dark:bg-slate-800/80 hover:bg-slate-700/80 dark:hover:bg-slate-700/80 border border-slate-700/60 text-amber-400 dark:text-cyan-400 hover:text-amber-300 dark:hover:text-cyan-300 transition-all duration-200 flex items-center justify-center shadow-xs cursor-pointer group"
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <FaSun className="text-base text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <FaMoon className="text-base text-indigo-600 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}

