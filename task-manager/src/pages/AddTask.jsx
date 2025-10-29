import { useFormik } from "formik";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { title: "" },
    onSubmit: (values) => {
      addTask({ title: values.title, completed: false });
      navigate("/");
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl mb-4 dark:text-white">Add Task</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <input
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          placeholder="Task title"
          className="border p-2 rounded"
        />
        <button className="bg-green-600 text-white py-2 rounded">Add Task</button>
      </form>
    </div>
  );
}
