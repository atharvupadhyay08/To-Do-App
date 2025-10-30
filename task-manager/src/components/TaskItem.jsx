// src/components/TaskItem.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm rounded p-3">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={!!task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 accent-blue-500"
          aria-label={`Toggle ${task.title}`}
        />
        <span className={task.completed ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>

      <div className="flex gap-2">
        <Link to={`/edit/${task.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded hover:opacity-90">Edit</Link>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:opacity-90"
          type="button"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default React.memo(TaskItem)
