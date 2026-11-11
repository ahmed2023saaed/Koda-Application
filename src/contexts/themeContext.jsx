import { createContext, useContext, useState, useEffect } from "react";

// 1. Create the Context object (null default, just like authContext)
const ThemeContext = createContext(null);

// 2. The Provider component (mirrors AuthProvider)
export function ThemeProvider({ children }) {
  // Read initial theme from localStorage, fall back to OS preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Side effect: apply `dark` class to <html> + persist, whenever isDarkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Action exposed to consumers (mirrors `login`/`logout` in authContext)
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook with a clear error guard (mirrors useAuth)
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}