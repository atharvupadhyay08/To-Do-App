import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";

const TaskList = lazy(() => import("./pages/TaskList"));
const AddTask = lazy(() => import("./pages/AddTask"));
const EditTask = lazy(() => import("./pages/EditTask"));

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Navbar />
        <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
        </Suspense>
      </TaskProvider>
    </ThemeProvider>
  );
}
