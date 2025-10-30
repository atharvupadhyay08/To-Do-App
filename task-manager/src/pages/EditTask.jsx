// src/pages/EditTask.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks.jsx"; // ✅ Ensure correct extension & path

export default function EditTask() {
  const { id } = useParams();
  const { tasks, editTask } = useTasks();
  const navigate = useNavigate();

  const found = tasks.find((t) => String(t.id) === String(id));

  const [title, setTitle] = useState(found?.title || "");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (found) setTitle(found.title);
  }, [found]);

  useEffect(() => {
    if (!found && tasks.length > 0) {
      navigate("/"); // redirect if task not found
    }
  }, [found, tasks, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await editTask(id, { title: title.trim() });
      navigate("/");
    } catch (error) {
      console.error(error);
      setErr("Could not save changes");
    } finally {
      setSubmitting(false);
    }
  };

  if (!found) return <p>Loading task...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto mt-10 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
    >
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

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
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
