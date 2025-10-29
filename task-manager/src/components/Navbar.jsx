import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-semibold">Task Manager</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/add">Add Task</Link>
        <button onClick={toggleTheme}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
