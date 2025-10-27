import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTasks } from '../context/TaskContext';


export default function EditTask() {
const { id } = useParams();
const { tasks, updateTask } = useTasks();
const navigate = useNavigate();


const task = tasks.find((t) => t.id === Number(id));


if (!task) return <p className="text-center mt-10">Task not found</p>;


const formik = useFormik({
initialValues: {
title: task.title,
description: task.description || '',
},
enableReinitialize: true,
validate: (values) => {
const errors = {};
if (!values.title) errors.title = 'Title is required';
return errors;
},
onSubmit: (values) => {
updateTask(Number(id), values);
navigate('/');
},
});


return (
<div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
<h2 className="text-xl font-semibold mb-4">Edit Task</h2>
<form onSubmit={formik.handleSubmit}>
<input
type="text"
name="title"
value={formik.values.title}
onChange={formik.handleChange}
className="w-full border p-2 rounded mb-2"
placeholder="Task Title"
/>
{formik.errors.title && (
<p className="text-red-500 text-sm">{formik.errors.title}</p>
)}
<textarea
name="description"
value={formik.values.description}
onChange={formik.handleChange}
className="w-full border p-2 rounded mb-2"
placeholder="Task Description"
/>
<button
type="submit"
className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
>
Save Changes
</button>
</form>
</div>
);
}