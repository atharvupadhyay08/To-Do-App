import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export function TaskProvider({ children }) {
const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


useEffect(() => {
const fetchTasks = async () => {
setLoading(true);
try {
const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
if (!res.ok) throw new Error('Failed to fetch tasks');
const data = await res.json();
setTasks(data);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
};
fetchTasks();
}, []);


// Add Task
const addTask = async (task) => {
const res = await fetch('https://jsonplaceholder.typicode.com/todos', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(task),
});
const newTask = await res.json();
setTasks([...tasks, newTask]);
};


// Update Task
const updateTask = async (id, updatedTask) => {
await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(updatedTask),
});
setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
};


// Delete Task
const deleteTask = async (id) => {
await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
method: 'DELETE',
});
setTasks(tasks.filter((task) => task.id !== id));
};


return (
<TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
{children}
</TaskContext.Provider>
);
}


export const useTasks = () => useContext(TaskContext);