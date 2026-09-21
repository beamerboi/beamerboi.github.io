"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function BlogThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    document.documentElement.lang = "en";
    let savedTheme = document.documentElement.dataset.theme;
    try {
      savedTheme = window.localStorage.getItem("theme") ?? savedTheme;
    } catch {
      // Preferences still work when browser storage is unavailable.
    }
    const nextTheme = savedTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    const timer = window.setTimeout(() => setTheme(nextTheme), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggle() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // Preference persistence is optional.
    }
  }
  const Icon = theme === "dark" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggle}
      className="icon-button theme-button"
      aria-label={theme === "dark" ? "Light theme" : "Dark theme"}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}
