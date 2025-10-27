import { Routes, Route } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';


export default function App() {
return (
<div className="min-h-screen bg-gray-100 p-4">
<Routes>
<Route path="/" element={<TaskList />} />
<Route path="/add" element={<AddTask />} />
<Route path="/edit/:id" element={<EditTask />} />
</Routes>
</div>
);
}