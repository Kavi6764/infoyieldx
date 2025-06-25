import React, { useState } from 'react';
import {
  ListTodo,
  LoaderCircle,
  CheckCircle2,
  CalendarClock,
  Flag,
} from 'lucide-react';

const initialTasks = [
  { id: 1, title: 'Update Website', status: 'todo', priority: 'high', dueDate: '2025-06-20' },
  { id: 2, title: 'Prepare Report', status: 'in-progress', priority: 'medium', dueDate: '2025-06-18' },
  { id: 3, title: 'Fix Bugs', status: 'completed', priority: 'low', dueDate: '2025-06-15' },
];

const statusIcon = {
  todo: <ListTodo className="text-blue-600" />,
  'in-progress': <LoaderCircle className="animate-spin text-yellow-500" />,
  completed: <CheckCircle2 className="text-green-600" />,
};

const statusColors = {
  todo: 'bg-blue-100 text-blue-700',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
};

const priorityColors = {
  high: 'text-red-600 font-semibold',
  medium: 'text-yellow-600 font-medium',
  low: 'text-gray-600',
};

const TaskManagement = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');

  const updateStatus = (id, newStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div className="p-6 container mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">📝 Task Manager</h1>

      {/* Filter */}
      <div className=" flex gap-3 items-center py-10 ">
        <label className="font-medium">Filter:</label>
        <select
          onChange={e => setFilter(e.target.value)}
          value={filter}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <ul className=" grid  gap-5 items-center grid-cols-1 md:grid-cols-3">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                {statusIcon[task.status]}
                {task.title}
              </h2>
              <span className={`text-sm px-2 py-1 rounded ${statusColors[task.status]}`}>
                {task.status}
              </span>
            </div>

            <div className="mt-2 text-sm space-y-1">
              <p className="flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Priority: <span className={priorityColors[task.priority]}>{task.priority}</span>
              </p>
              <p className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4" />
                Due Date: {task.dueDate}
              </p>
            </div>

            {/* Status Selector */}
            <div className="mt-4">
              <label className="text-sm mr-2">Update Status:</label>
              <select
                value={task.status}
                onChange={e => updateStatus(task.id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManagement;
