"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("bookshelf-dark");

  useEffect(() => {
    const saved = localStorage.getItem("bs-theme");
    if (saved === "bookshelf-light" || saved === "bookshelf-dark") {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bs-theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) =>
      t === "bookshelf-dark" ? "bookshelf-light" : "bookshelf-dark"
    );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
