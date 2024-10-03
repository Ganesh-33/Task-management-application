// src/components/TaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
    const [taskText, setTaskText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { text: taskText, dueDate, category };
        const response = await axios.post('/api/tasks', newTask, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        onTaskAdded(response.data);
        setTaskText('');
        setDueDate('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="New Task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
