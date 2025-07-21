document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText, false);
  taskInput.value = "";
}

function createTaskElement(text, isChecked = false) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  if (isChecked) span.classList.add("checked");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("task-buttons");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.className = "done";
  doneBtn.onclick = function (e) {
    e.stopPropagation();
    span.classList.toggle("checked");
    updateStorage();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete";
  deleteBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    updateStorage();
  };

  buttonsDiv.appendChild(doneBtn);
  buttonsDiv.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(buttonsDiv);

  document.getElementById("taskList").appendChild(li);
}

function saveTask(text, isChecked) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, isChecked });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const allTasks = document.querySelectorAll("#taskList li");
  const updated = [];

  allTasks.forEach((li) => {
    const text = li.querySelector("span").textContent;
    const isChecked = li.querySelector("span").classList.contains("checked");
    updated.push({ text, isChecked });
  });

  localStorage.setItem("tasks", JSON.stringify(updated));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.isChecked));
}