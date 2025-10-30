import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../context/TaskContext.jsx'

export default function TaskList() {
  const { tasks, loading, error, toggleTask, deleteTask } = useTaskContext()
  const [filter, setFilter] = useState('all')

  // Filtered tasks (all / completed / pending)
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter((t) => t.completed)
      case 'pending':
        return tasks.filter((t) => !t.completed)
      default:
        return tasks
    }
  }, [tasks, filter])

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Tasks</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </Link>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <label htmlFor="filter" className="font-medium">
          Filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1 bg-white dark:bg-gray-800"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No tasks found</p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-4 h-4 accent-green-600"
                />
                <span
                  className={`${
                    task.completed
                      ? 'line-through text-gray-400'
                      : 'text-gray-800 dark:text-gray-100'
                  }`}
                >
                  {task.title}
                </span>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/edit/${task.id}`}
                  className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
