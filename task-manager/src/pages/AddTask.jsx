import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useTasks } from '../context/TaskContext';


export default function AddTask() {
const { addTask } = useTasks();
const navigate = useNavigate();


const formik = useFormik({
initialValues: { title: '', description: '' },
validate: (values) => {
const errors = {};
if (!values.title) errors.title = 'Title is required';
return errors;
},
onSubmit: async (values) => {
await addTask({ title: values.title, completed: false });
navigate('/');
},
});


return (
<div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
<h2 className="text-xl font-semibold mb-4">Add Task</h2>
<form onSubmit={formik.handleSubmit}>
<input
type="text"
name="title"
placeholder="Task Title"
value={formik.values.title}
onChange={formik.handleChange}
className="w-full border p-2 rounded mb-2"
/>
{formik.errors.title && (
<p className="text-red-500 text-sm">{formik.errors.title}</p>
)}
<button
type="submit"
className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
>
Add Task
</button>
</form>
</div>
);
}