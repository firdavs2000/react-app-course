import { createContext, useLayoutEffect, useState } from "react";
import { THEME_STORAGE } from "../constans";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const savedTheme = localStorage.getItem(THEME_STORAGE) || "light"; // harf kichik bo‘lsin
  const [theme, setTheme] = useState(savedTheme);

  useLayoutEffect(() => {
    const applyTheme = (newTheme) => {
      if (newTheme === "dark") {
        document.body.classList.add("darkLayout");
      } else {
        document.body.classList.remove("darkLayout");
      }
      setTheme(newTheme);
      localStorage.setItem(THEME_STORAGE, newTheme);
    };

    const detectTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(isDark ? "dark" : "light");
    };

    // birinchi marta chaqiramiz
    detectTheme();

    // OS theme o‘zgarganda ham ishlaydi
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", detectTheme);

    return () => {
      mediaQuery.removeEventListener("change", detectTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
