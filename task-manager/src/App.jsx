import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

const TaskList = lazy(() => import("./pages/TaskList.jsx"));
const AddTask = lazy(() => import("./pages/AddTask.jsx"));
const EditTask = lazy(() => import("./pages/EditTask.jsx"));

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add" element={<AddTask />} />
              <Route path="/edit/:id" element={<EditTask />} />
            </Routes>
          </Suspense>
        </main>
      </TaskProvider>
    </ThemeProvider>
  );
}
