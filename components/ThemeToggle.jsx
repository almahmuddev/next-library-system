"use client";
import { useTheme } from "@/lib/theme";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "bookshelf-dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="btn btn-ghost btn-sm btn-circle relative overflow-hidden group"
      title={isDark ? "Switch to Light theme" : "Switch to Dark theme"}
    >
      {/* Dark → shows Moon */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90 scale-50"
        }`}
      >
        <FiMoon className="text-primary text-lg" />
      </span>

      {/* Light → shows Sun */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          !isDark ? "opacity-100 rotate-0" : "opacity-0 rotate-90 scale-50"
        }`}
      >
        <FiSun className="text-primary text-lg" />
      </span>
    </button>
  );
}
