import React from 'react';

const ProgressBar = ({ tasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div>
      <h3>Progress</h3>
      <div style={{ width: '100%', background: '#ccc' }}>
        <div 
          style={{ 
            width: `${progress}%`, 
            background: 'green', 
            height: '20px' 
          }}
        ></div>
      </div>
      <p>{completedTasks}/{totalTasks} tasks completed</p>
    </div>
  );
};

export default ProgressBar;
