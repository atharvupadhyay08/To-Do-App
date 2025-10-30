// src/pages/EditTask.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks.js";

export default function EditTask() {
  const { id } = useParams();
  const { tasks, editTask } = useTasks();
  const navigate = useNavigate();

  const found = tasks.find((t) => String(t.id) === String(id));

  const [title, setTitle] = useState(found?.title ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (found) setTitle(found.title);
  }, [found]);

  useEffect(() => {
    if (!found && tasks.length > 0) {
      // If tasks are loaded but the task is missing, redirect
      navigate("/");
    }
  }, [found, tasks, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // renamed 'e' → 'event' for clarity
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await editTask(id, { title: title.trim() });
      navigate("/");
    } catch {
      setErr("Could not save changes");
    } finally {
      setSubmitting(false);
    }
  };

  if (!found) return <p>Loading task...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <h1 className="text-2xl font-bold">Edit Task</h1>

      {err && <p className="text-red-500">{err}</p>}

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full border p-2 rounded"
        aria-label="Task title"
      />

      <div className="flex gap-2">
        <button
          disabled={submitting}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

