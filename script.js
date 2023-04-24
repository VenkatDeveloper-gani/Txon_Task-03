// Array to store tasks
let tasks = [];

// Add task to array
function addTask() {
    let taskInput = document.getElementById("taskInput");
    if (taskInput.value !== "") {
        tasks.push({
            task: taskInput.value,
            completed: false
        });
        taskInput.value = "";
        displayTasks();
    }
}

// Display tasks on the page
function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskListItem = document.createElement("div");
        taskListItem.className = "task-list-item";
        taskListItem.innerHTML = `
			<input type="checkbox" id="task${i}" onchange="updateTask(${i})" ${task.completed ? "checked" : ""}>
			<label for="task${i}" class="${task.completed ? "completed" : ""}">${task.task}</label>
			<button onclick="deleteTask(${i})">Delete</button>
		`;
        taskList.appendChild(taskListItem);
    }
}

// Delete task from array
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

// Update task in array
function updateTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

// Filter tasks based on completion status
function filterTasks(filter) {
    let allButton = document.getElementById("allButton");
    let completedButton = document.getElementById("completedButton");
    let activeButton = document.getElementById("activeButton");
    switch (filter) {
        case "completed":
            allButton.classList.remove("active");
            completedButton.classList.add("active");
            activeButton.classList.remove("active");
            let completedTasks = tasks.filter(task => task.completed);
            displayFilteredTasks(completedTasks);
            break;
        case "active":
            allButton.classList.remove("active");
            completedButton.classList.remove("active");
            activeButton.classList.add("active");
            let activeTasks = tasks.filter(task => !task.completed);
            displayFilteredTasks(activeTasks);
            break;
        default:
            allButton.classList.add("active");
            completedButton.classList.remove("active");
            activeButton.classList.remove("active");
            displayTasks();
    }
}

// Display filtered tasks on the page
function displayFilteredTasks(filteredTasks) {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];
        let taskListItem = document.createElement("div");
        taskListItem.className = "task-list-item";
        taskListItem.innerHTML = `
			<input type="checkbox" id="task${i}" onchange="updateTask(${tasks.indexOf(task)})" ${task.completed ? "checked" : ""}>
			<label for="task${i}" class="${task.completed ? "completed" : ""}">${task.task}</label>
			<button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
		`;
        taskList.appendChild(taskListItem);
    }
}
