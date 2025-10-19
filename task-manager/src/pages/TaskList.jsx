import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, loading, error, deleteTask } = useTasks();

  if (loading) return <p className="text-center text-gray-500">Loading tasks...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </Link>
      </div>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
          >
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
            <div className="space-x-3">
              <Link
                to={`/edit/${task.id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
