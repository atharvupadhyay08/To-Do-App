import React from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function DarkModeToggle() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded border hover:opacity-90 transition"
      type="button"
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
