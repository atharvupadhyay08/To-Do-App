import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useTasks } from "../context/TaskContext";

export default function EditTask() {
  const { id } = useParams();
  const { tasks, editTask } = useTasks();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === Number(id));

  const formik = useFormik({
    initialValues: { title: task?.title || "" },
    enableReinitialize: true,
    onSubmit: (values) => {
      editTask(Number(id), { ...task, title: values.title });
      navigate("/");
    },
  });

  if (!task) return <p className="text-center mt-10 text-gray-500">Task not found</p>;

  return (
    <div className="max-w-md mx-auto mt-10 dark:text-white">
      <h2 className="text-xl mb-4">Edit Task</h2>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <input
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          className="border p-2 rounded"
        />
        <button className="bg-blue-600 text-white py-2 rounded">Save</button>
      </form>
    </div>
  );
}
