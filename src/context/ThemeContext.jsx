import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 'system' | 'dark' | 'light'
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem("dhanus-theme-mode");
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved;
    }
    return "system";
  });

  // Effective resolved theme: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("dhanus-theme-mode");
    if (saved === "light") return "light";
    if (saved === "dark") return "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Handle system preference changes & mode updates
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      let activeTheme = "dark";
      if (themeMode === "system") {
        activeTheme = mediaQuery.matches ? "dark" : "light";
      } else {
        activeTheme = themeMode;
      }

      setTheme(activeTheme);
      const root = document.documentElement;

      if (activeTheme === "dark") {
        root.classList.add("dark");
        root.classList.remove("light");
        root.style.colorScheme = "dark";
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#08080a");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        root.style.colorScheme = "light";
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f8fafc");
      }
    };

    updateTheme();

    const handleChange = (e) => {
      if (themeMode === "system") {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
        const root = document.documentElement;
        if (newTheme === "dark") {
          root.classList.add("dark");
          root.classList.remove("light");
          root.style.colorScheme = "dark";
          document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#08080a");
        } else {
          root.classList.remove("dark");
          root.classList.add("light");
          root.style.colorScheme = "light";
          document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f8fafc");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [themeMode]);

  const changeThemeMode = (mode) => {
    setThemeMode(mode);
    localStorage.setItem("dhanus-theme-mode", mode);
  };

  const toggleTheme = () => {
    // If currently dark, switch to light; if currently light, switch to dark
    const nextMode = theme === "dark" ? "light" : "dark";
    changeThemeMode(nextMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme, // 'dark' | 'light'
        themeMode, // 'system' | 'dark' | 'light'
        setThemeMode: changeThemeMode,
        toggleTheme,
        isDark: theme === "dark",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
