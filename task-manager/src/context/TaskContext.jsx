// src/context/TaskContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as api from "../utils/api.js";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await api.getTodos();
        setTasks(data);
      } catch {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const addTask = useCallback(async (task) => {
    const newTask = await api.addTodo(task);
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const editTask = useCallback(async (id, updates) => {
    await api.updateTodo(id, updates);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTask = useCallback(async (id) => {
    await api.deleteTodo(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTask = useCallback(async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await editTask(id, { completed: !task.completed });
  }, [tasks, editTask]);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, editTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  return useContext(TaskContext);
}
