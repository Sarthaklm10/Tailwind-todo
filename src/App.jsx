import React, { useState, useEffect } from 'react';
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import './index.css';

const App = () => {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem('tasks')) || [],
  );
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [theme, setTheme] = useState('dark');
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;
    const newTask = {
      title: task,
      category,
      dueDate,
      completed: false,
    };
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setTask('');
    setCategory('');
    setDueDate('');
  };

  const deleteTask = (index) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const updated = [...tasks];
      updated.splice(index, 1);
      setTasks(updated);
    }
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const startEdit = (index) => {
    const t = tasks[index];
    setTask(t.title);
    setCategory(t.category);
    setDueDate(t.dueDate);
    setEditIndex(index);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div
      className={`font-kanit min-h-screen px-6 py-10 transition duration-700 ease-in-out ${theme === 'light' ? 'bg-gradient-to-br from-white to-blue-100 text-gray-900' : 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'}`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <button
          onClick={toggleTheme}
          className={`rounded border px-4 py-2 font-semibold transition-colors duration-300 ${theme === 'light' ? 'text-gray-800 hover:bg-gray-200' : 'text-white hover:bg-gray-700 hover:text-gray-100'}`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task..."
          className="flex-grow rounded border p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-gray-700 dark:text-white"
        />
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="rounded border p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="rounded border p-2 dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={addTask}
          className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-600"
        >
          {editIndex !== null ? (
            <PencilSquareIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}{' '}
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="mb-4 w-full rounded border p-2 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
      />

      {tasks.length > 0 && (
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Completed: {completedCount} / {tasks.length}
          <div className="mt-1 h-2 w-full rounded bg-gray-300">
            <div
              className="h-2 rounded bg-green-500 transition-all"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks yet. Add something productive!
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredTasks.map((t, i) => (
            <li
              key={i}
              className={`flex items-center justify-between rounded p-4 shadow transition dark:bg-gray-700 ${t.completed ? 'bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-200' : 'bg-white text-gray-900 dark:bg-gray-700 dark:text-white'}`}
            >
              <div>
                <p
                  className={`font-medium ${t.completed ? 'line-through opacity-70' : ''}`}
                >
                  {t.title}
                </p>
                <p className="text-sm text-gray-500">
                  {t.category} {t.dueDate && `| Due: ${t.dueDate}`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-1 text-green-500 transition-all duration-300 ease-in-out hover:text-green-600"
                  onClick={() => toggleComplete(i)}
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500 hover:text-green-700" />
                </button>
                <button onClick={() => startEdit(i)}>
                  <PencilSquareIcon className="h-5 w-5 text-yellow-500 hover:text-yellow-700" />
                </button>
                <button onClick={() => deleteTask(i)}>
                  <TrashIcon className="h-5 w-5 text-red-500 hover:text-red-700" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
