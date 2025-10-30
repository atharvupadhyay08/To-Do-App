import React from "react";
import { useTheme } from "../context/ThemeContext.jsx";

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle dark mode"
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border 
        transition-all duration-300 
        ${
          darkMode
            ? "bg-gray-800 text-yellow-300 border-gray-700 hover:bg-gray-700"
            : "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300"
        }`}
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
