import React from "react";

const TaskItem = React.memo(({ task, onEdit, onDelete }) => (
  <div className="border p-3 mb-2 rounded flex justify-between items-center dark:bg-gray-800 dark:text-gray-200">
    <div className="flex items-center gap-2">
      <input type="checkbox" checked={task.completed} readOnly />
      <span className={task.completed ? "line-through text-gray-400" : ""}>
        {task.title}
      </span>
    </div>
    <div className="flex gap-2">
      <button onClick={onEdit} className="text-blue-500 hover:underline">Edit</button>
      <button onClick={onDelete} className="text-red-500 hover:underline">Delete</button>
    </div>
  </div>
));

export default TaskItem;
