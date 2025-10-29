import { createContext, useContext, useEffect, useState, useCallback } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🧩 Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      const data = await res.json();
      setTasks(data);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  //  Add task
  const addTask = useCallback(async (task) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  }, []);

  //  Edit task
  const editTask = useCallback(async (id, updatedTask) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = { tasks, loading, error, addTask, editTask, deleteTask };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTasks = () => useContext(TaskContext);
