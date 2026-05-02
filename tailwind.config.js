/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        /* ── DARK theme: Midnight Amber ── */
        "bookshelf-dark": {
          primary: "#f59e0b",
          "primary-content": "#0f172a",
          secondary: "#8b5cf6",
          "secondary-content": "#ffffff",
          accent: "#10b981",
          "accent-content": "#ffffff",
          neutral: "#1e293b",
          "neutral-content": "#f1f5f9",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#f1f5f9",
          info: "#38bdf8",
          "info-content": "#0f172a",
          success: "#4ade80",
          "success-content": "#0f172a",
          warning: "#fb923c",
          "warning-content": "#0f172a",
          error: "#f87171",
          "error-content": "#0f172a",
        },
      },
      {
        /* ── LIGHT theme: Warm Ivory ── */
        "bookshelf-light": {
          primary: "#d97706",
          "primary-content": "#ffffff",
          secondary: "#7c3aed",
          "secondary-content": "#ffffff",
          accent: "#059669",
          "accent-content": "#ffffff",
          neutral: "#e2e8f0",
          "neutral-content": "#1e293b",
          "base-100": "#fefce8",
          "base-200": "#fef3c7",
          "base-300": "#fde68a",
          "base-content": "#1e293b",
          info: "#0284c7",
          "info-content": "#ffffff",
          success: "#16a34a",
          "success-content": "#ffffff",
          warning: "#d97706",
          "warning-content": "#ffffff",
          error: "#dc2626",
          "error-content": "#ffffff",
        },
      },
    ],
  },
};
