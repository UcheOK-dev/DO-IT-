document.addEventListener('DOMContentLoaded', () => {
   const todoInput = document.getElementById("todo-input");
   const addTaskButton = document.getElementById("add-task-button");
   const todoList = document.getElementById("todo-list");

   let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

   tasks.forEach((task) => renderTask(task));

   addTaskButton.addEventListener('click', () => {
       const taskText = todoInput.value.trim();
       if (taskText === "") return;

       const newTask = {
           id: Date.now(),
           text: taskText,
           completed: false,
       };
       tasks.push(newTask);
       saveTasks();
       renderTask(newTask); // Add task to the list immediately
       todoInput.value = ""; // Clear input
       console.log(tasks);
   });

   function renderTask(task) {
       const li = document.createElement("li");
       if (task.completed) li.classList.toggle("completed");

       const span = document.createElement("span");
       span.textContent = task.text;

       // Check for more than 16 words or any word longer than 20 characters
       const words = task.text.trim().split(/\s+/);
       if (words.length > 16 || words.some(word => word.length > 20)) {
           span.classList.add("scrollable-task");
       }

       li.appendChild(span);

       // Create and style the delete button
       const deleteBtn = document.createElement("button");
       deleteBtn.textContent = "Delete";
       deleteBtn.className = "delete";
       deleteBtn.style.backgroundColor = "red";
       deleteBtn.style.borderRadius = "3px";

       li.appendChild(deleteBtn);

       li.addEventListener('click', (e) => {
           if (e.target.tagName === "BUTTON") return;
           task.completed = !task.completed;
           li.classList.toggle('completed');
           saveTasks();
       });

       deleteBtn.addEventListener('click', (e) => {
           e.stopPropagation();
           tasks = tasks.filter(target => target.id !== task.id);
           li.remove();
           saveTasks();
       });

       todoList.appendChild(li);
   }

   function saveTasks() {
       localStorage.setItem('tasks', JSON.stringify(tasks));
   }
});