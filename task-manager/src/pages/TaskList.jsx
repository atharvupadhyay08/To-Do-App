import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import TaskItem from "../components/TaskItem";

export default function TaskList() {
  const { tasks, loading, error, deleteTask } = useTasks();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  // ✅ Always define hooks at the top level
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  // ✅ No hooks below this point
  let content;
  if (loading) {
    content = <p className="text-center mt-10">Loading...</p>;
  } else if (error) {
    content = <p className="text-center text-red-500">{error}</p>;
  } else if (filteredTasks.length === 0) {
    content = <p className="text-center mt-10">No tasks found.</p>;
  } else {
    content = (
      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => navigate(`/edit/${task.id}`)}
            onDelete={() => deleteTask(task.id)}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 dark:text-white">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <Link
          to="/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add
        </Link>
      </div>

      {/* ✅ Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded dark:bg-gray-800"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {content}
    </div>
  );
}
