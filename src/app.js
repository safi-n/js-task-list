// Declare all Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearTask = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const addTask = document.querySelector('#task')

// Load all event listeners
loadEventListeners();
function loadEventListeners() {

  document.addEventListener('DOMContentLoaded', getTasks)
  form.addEventListener('submit', taskCreate);
  taskList.addEventListener('click', removeTask);
  clearTask.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks)

}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.append(document.createTextNode(task));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = `<i class="fa fa-remove"></i>`;

    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// Add Task
function taskCreate(e) {
  const li = document.createElement('li');
  li.className = 'collection-item';
  li.append(document.createTextNode(addTask.value));

  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = `<i class="fa fa-remove"></i>`;

  li.appendChild(link);
  taskList.appendChild(li);
  storeTaskInLocalStorage(addTask.value);

  addTask.value = '';
  e.preventDefault();
}

// Store in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
      e.target.parentElement.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

// Remove from LocalStorage
function removeTaskFromLocalStorage(listItem) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task, index) =>{
    if (listItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks))
}


// Clear tasks
function clearTasks() {
  while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
      clearFromLocalStorage();;
    }
}

// Clear from LS
function clearFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
