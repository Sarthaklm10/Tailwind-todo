import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className={
        theme === 'light'
          ? 'min-h-screen bg-white p-8 text-black'
          : 'min-h-screen bg-gray-900 p-8 text-white'
      }
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Todo App</h1>
        <button
          onClick={toggleTheme}
          className="rounded border px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>

      <div className="mb-4 flex">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="mr-2 flex-grow rounded border p-2"
          placeholder="Enter a task"
        />
        <button
          onClick={addTask}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((t, i) => (
          <li key={i} className="border-b py-1">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
