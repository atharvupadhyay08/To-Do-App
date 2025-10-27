import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';


export default function TaskList() {
const { tasks, loading, error, deleteTask } = useTasks();


if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
if (error) return <p className="text-center text-red-500">Error: {error}</p>;


return (
<div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
<h1 className="text-2xl font-semibold mb-4">Task List</h1>
<Link
to="/add"
className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
>
➕ Add Task
</Link>
{tasks.map((task) => (
<div key={task.id} className="border p-3 mb-2 rounded flex justify-between items-center">
<span>{task.title}</span>
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
))}
</div>
);
}