// Function to toggle light and dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Function to add a new task to the list
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskTime = document.getElementById("taskTime");
    let prioritySelect = document.getElementById("prioritySelect");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") return;

    let li = document.createElement("li");
    li.textContent = taskInput.value;
    li.draggable = true;
    li.id = "task-" + Date.now();
    
    // Set priority class based on user selection
    let priority = prioritySelect.value;
    li.classList.add(priority);

    // Drag-and-drop functionality
    li.ondragstart = (e) => e.dataTransfer.setData("text", e.target.id);
    li.ondragover = (e) => e.preventDefault();
    li.ondrop = (e) => {
        let draggedId = e.dataTransfer.getData("text");
        let draggedEl = document.getElementById(draggedId);
        taskList.insertBefore(draggedEl, e.target);
    };
    
    // Remove task when clicked
    li.onclick = () => li.remove();
    
    taskList.appendChild(li);

    // Set task reminder
    if (taskTime.value) {
        let reminderTime = new Date();
        let [hours, minutes] = taskTime.value.split(":");
        reminderTime.setHours(hours, minutes, 0);
        let delay = reminderTime - new Date();
        if (delay > 0) {
            setTimeout(() => {
                alert(`Reminder: ${taskInput.value}`);
            }, delay);
        }
    }
    
    // Clear input fields
    taskInput.value = "";
    taskTime.value = "";
    prioritySelect.value = "high"; // Reset priority to high after adding
}