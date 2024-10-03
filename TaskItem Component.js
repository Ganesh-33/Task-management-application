import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveEdit = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
          />
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleEditChange}
          />
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      ) : (
        <div>
          <span className={task.completed ? 'completed' : ''}>
            {task.title} - {task.description} (Due: {task.dueDate})
          </span>
          <button onClick={() => onToggleComplete(task.id)}>
            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
