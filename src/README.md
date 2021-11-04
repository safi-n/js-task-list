Welcome to README for the task list project.
This project is created for a simple task form with pure JS and HTML.

Feature of the project:
1) Create task and store in local storage(LS).
2) remove or delete task from task list & LS
3) filter or search tasks
4) Clear all task/tasks from task list


I DON'T WANT TO STORE TASKS IN MY LOCAL STORAGE!!
This a descriptive file for this application as well in this syntax the task won't be stored in your local storage in case you want to use the code without storing them.
Go ahead and past this syntax in app.js file.

NOTE!! please remove <!-- text --> these brackets before pasting them to your app.js.

<!-- Declare variables -->
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filterTask = document.querySelector('#filter');

<!-- Load all events -->
loadEventListeners();

!!load all event listeners ----------- function
function loadEventListeners() {

<!-- Add task event -->
  form.addEventListener('submit', addTask);
}

<!-- Add task function -->

function addTask(e) {
  <!-- create li element -->
  const li = document.createElement('li');
  <!-- add class -->
  li.className = 'collection-item'
  <!-- create text node and append it as the child -->
  li.append(document.createTextNode(taskInput.value));
  <!-- create a link element -->
  const link = document.createElement('a');
  <!-- add className to the link -->
  link.className = "delete-item secondary-content";
  <!-- add innerHTML -->
  link.innerHTML = `<i class="fa fa-remove"></i>`;
  <!-- append it to the li tag -->
  li.appendChild(link);
  <!-- append li to the ul -->
  taskList.appendChild(li);

  <!-- clear the input -->
  taskInput.value = '';
  e.preventDefault();
}

<!-- Delete Task function -->

function removeTask(e) {
  <!-- Find the parent element that contains the class delete -->
  if (e.target.parentElement.classList.contains('delete-item')) {
    <!-- this is a confirmation for delete -->
    if (confirm('Are you Sure?')) {
    <!-- target the li element and remove its -->
      e.target.parentElement.parentElement.remove();
    }
  }
}

<!-- clear Tasks -->
function clearTasks() {
  <!-- Solution 1 -->
  taskList.innerHTML = '';

  <!-- Solution 2 -->

  <!-- as long as there is a first child in this ul -->
  while (taskList.firstChild) {
    <!-- remove the first child -->
    taskList.removeChild(taskList.firstChild);
  }
}

<!-- Filter the task -->
function filterTasks(e) {

  <!-- Get the text from whatever the user type -->
  const text = e.target.value.toLowerCase();
  <!-- get all the task form the ul mean all li's -->
  document.querySelectorAll('.collection-item').forEach(function(task) {
    <!-- forEach task we will get its content -->
    const item = task.firstChild.textContent;
    <!-- if the task that we set as an item has the value of text -->
    <!-- -1 mean that its not equal to negative search means the presense of text is true -->
    if (item.toLowerCase().indexOf(text) != -1) {
      <!-- show the task -->
      task.style.display = 'block';
    } else {
      <!-- else dont show the task -->
      task.style.display = 'none';
    }
  });
}
