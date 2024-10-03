import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import ProgressBar from './ProgressBar';
import './App.css';

const App = () => {
  const [userName, setUserName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks and username from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const savedName = localStorage.getItem('userName') || '';
    const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setTasks(savedTasks);
    setUserName(savedName);
    setDarkMode(savedDarkMode);
  }, []);

  // Save tasks and dark mode to localStorage on changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [tasks, darkMode]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setUserName(name);
    localStorage.setItem('userName', name);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>{userName ? `Hello, ${userName}!` : 'Enter your name:'}</h1>
        {!userName && <input type="text" onChange={handleNameChange} placeholder="Your name" />}
        <button onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>

      <ProgressBar tasks={tasks} />

      <div className="task-section">
        <button onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? 'Show Pending Tasks' : 'Show Completed Tasks'}
        </button>

        <TaskList
          tasks={tasks}
          showCompleted={showCompleted}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onToggleComplete={handleToggleComplete}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
};

export default App;
