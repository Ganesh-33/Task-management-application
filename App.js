import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import ProgressBar from './ProgressBar';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#fff',
  color: '#000',
};

const darkTheme = {
  background: '#333',
  color: '#fff',
};

const App = () => {
  const [userName, setUserName] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('pending'); // Can be 'pending' or 'completed'

  const handleAddTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredTasks = tasks.filter(task => 
    filter === 'pending' ? !task.completed : task.completed
  );

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000' }}>
        <h1>Task Manager</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <h2>Welcome, {userName || 'User'}!</h2>
        <button onClick={toggleDarkMode}>
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <TaskList tasks={filteredTasks} addTask={handleAddTask} setTasks={setTasks} />
        <ProgressBar tasks={tasks} />
      </div>
    </ThemeProvider>
  );
};

export default App;
