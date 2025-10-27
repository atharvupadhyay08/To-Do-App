import { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  const [filter, setFilter] = useState("all"); // all, completed, pending

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  // 🔍 Apply filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h1 className="text-2xl font-semibold mb-4">Task List</h1>

      {/* 🔘 Header with Add button and Filter */}
      <div className="flex justify-between items-center mb-4">
        <Link
          to="/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Task
        </Link>

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* 🧾 Task List */}
      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks to display</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  updateTask(task.id, { ...task, completed: !task.completed })
                }
              />
              <span
                className={task.completed ? "line-through text-gray-500" : ""}
              >
                {task.title}
              </span>
            </div>
            <div className="flex gap-2">
              <Link to={`/edit/${task.id}`} className="text-blue-500 hover:underline">
                Edit
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
