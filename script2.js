let tasks = [];
let editedTaskId = null;

// Function to render task list
function renderTaskList() {
    const taskListUl = document.getElementById('task-list-ul');
    taskListUl.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(${index})">
            <span>${task.name}</span>
            <button class="edit-btn" onclick="editTask(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            <span class="due-date">${task.dueDate}</span>
        `;

        taskItem.classList.toggle('completed', task.completed);

        taskListUl.appendChild(taskItem);
    });
}

// Function to add task
function addTask(taskName) {
    const newTask = {
        name: taskName,
        completed: false,
        dueDate: ''
    };

    tasks.push(newTask);
    renderTaskList();
    document.getElementById('task-input').value = '';
}

// Function to edit task
function editTask(taskId) {
    editedTaskId = taskId;
    const taskName = tasks[taskId].name;
    document.getElementById('edit-task-input').value = taskName;
    document.querySelector('.edit-task').style.display = 'block';
}

// Function to save edited task
function saveEditedTask() {
    const taskName = document.getElementById('edit-task-input').value;
    tasks[editedTaskId].name = taskName;
    renderTaskList();
    document.querySelector('.edit-task').style.display = 'none';
}

// Function to cancel editing task
function cancelEditingTask() {
    document.querySelector('.edit-task').style.display = 'none';
}

// Function to delete task
function deleteTask(taskId) {
    tasks.splice(taskId, 1);
    renderTaskList();
}

// Function to toggle task completion
function toggleTaskCompletion(taskId) {
    tasks[taskId].completed = !tasks[taskId].completed;
    renderTaskList();
}

// Event listeners
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskName = document.getElementById('task-input').value.trim();
    if (taskName) {
        addTask(taskName);
    }
});

document.getElementById('save-task-btn').addEventListener('click', saveEditedTask);
document.getElementById('cancel-task-btn').addEventListener('click', cancelEditingTask);

// Initialize task list
renderTaskList();