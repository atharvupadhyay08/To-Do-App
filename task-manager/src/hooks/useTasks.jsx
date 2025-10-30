import { useContext } from "react";
import { TaskContext } from "../context/TaskContext.jsx";

export default function useTasks() {
  return useContext(TaskContext);
}
