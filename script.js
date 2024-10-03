document.addEventListener('DOMContentLoaded', () => {
    const userNameInput = document.getElementById('user-name');
    const submitNameButton = document.getElementById('submit-name');
    const greeting = document.getElementById('greeting');
    const addTaskButton = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    const toggleButton = document.getElementById('toggle-pending-completed');
    const toggleModeButton = document.getElementById('toggle-mode');
    const progressBar = document.getElementById('progress');
    let darkMode = false;
    let tasks = [];

    // Handle user name submission
    submitNameButton.addEventListener('click', () => {
        const userName = userNameInput.value;
        if (userName) {
            greeting.textContent = `Welcome, ${userName}!`;
            userNameInput.value = '';
        }
    });

    // Add task
    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value;
        if (taskText) {
            const task = { text: taskText, completed: false };
            tasks.push(task);
            newTaskInput.value = '';
            updateTaskLists();
        }
    });

    // Update task lists (pending and completed)
    function updateTaskLists() {
        pendingTasksList.innerHTML = '';
        completedTasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;

            // Edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-btn');
            editButton.addEventListener('click', () => editTask(index));

            // Complete/Delete buttons
            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.addEventListener('click', () => toggleCompleteTask(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(index));

            li.appendChild(editButton);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            if (task.completed) {
                li.classList.add('completed');
                completedTasksList.appendChild(li);
            } else {
                pendingTasksList.appendChild(li);
            }
        });
        updateProgressBar();
    }

    // Edit a task
    function editTask(index) {
        const newTaskText = prompt('Edit task:', tasks[index].text);
        if (newTaskText) {
            tasks[index].text = newTaskText;
            updateTaskLists();
        }
    }

    // Toggle task completion
    function toggleCompleteTask(index) {
        tasks[index].completed = !tasks[index].completed;
        updateTaskLists();
    }

    // Delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        updateTaskLists();
    }

    // Update the progress bar
    function updateProgressBar() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    // Toggle between showing pending and completed tasks
    toggleButton.addEventListener('click', () => {
        const showCompleted = toggleButton.textContent === 'Show Completed';
        completedTasksList.style.display = showCompleted ? 'block' : 'none';
        pendingTasksList.style.display = showCompleted ? 'none' : 'block';
        toggleButton.textContent = showCompleted ? 'Show Pending' : 'Show Completed';
    });

    // Toggle between dark and light modes
    toggleModeButton.addEventListener('click', () => {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
    });
});
