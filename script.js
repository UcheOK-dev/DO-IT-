document.addEventListener('DOMContentLoaded', () => {
const todoInput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-button")
const todoList = document.getElementById("todo-list")

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

tasks.forEach((task) => renderTask(task));

addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim()
        if(taskText === "")return;

   const newTask = {
       id: Date.now(),
       text: taskText,
       completed: false,
        }
   tasks.push(newTask)
   saveTasks()
   renderTask(newTask)// Add task to the list immediately
   todoInput.value = ""//Clear input
   console.log(tasks);
})

   function renderTask(task) {
     const li = document.createElement("li");
     if (task.completed) li.classList.toggle("completed");
     saveTasks()
     li.innerHTML = `<span>${task.text}</span>
 <button>Delete</button>`;

 li.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTasks()
 })
 li.querySelector('button').style.backgroundColor = "red"
 li.querySelector('button').style.borderRadius = "3px"
 li.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation()//
    tasks = tasks.filter( target => target.id !== task.id)
    li.remove()
    saveTasks()
 })

 todoList.appendChild(li)
}


function saveTasks(){
        localStorage.setItem('tasks', JSON.stringify(tasks));
}
}) 