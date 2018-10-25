// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task')
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
      // DOM load event
      document.addEventListener('DOMContentLoaded', getTasks);
      // Add task loadEventListeners
      form.addEventListener('submit', addTask);
      // Filter Tasks
      filter.addEventListener('keyup', filterTasks);
      // Remove task event
      taskList.addEventListener('click', removeTask);
      // Clear all tasks
      clearBtn.addEventListener('click', clearTasks);
}

// Get tasks from local storage
function getTasks() {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task) {
        // Create ls element
        const li = document.createElement('li')
        // Add Class function
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a')
        // Add class
        link.className = 'delete-item secondary-content';
        // Addd icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
      });
}

// Add task function
function addTask(e) {
      // Create ls element
      const li = document.createElement('li');

      // No input when clicked
      let clearLi;
      if(taskInput.value === '') {
        alert('Add a task');
        return false;
      };


    // Add Class function
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a')
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';

      e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
      let tasks;
      // else retrive item from local storage
      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }


      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Filter Tasks function
function filterTasks(e) {
      const text = e.target.value.toLowerCase();

      document.querySelectorAll('.collection-item').forEach(
        function(task) {
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
          } else {
            task.style.display = 'none';
          }
        });
}


// Remove Task function
function removeTask(e) {
      let deleteItem = e.target.parentElement.classList.contains('delete-item');
      let listItem = e.target.parentElement.parentElement;
      if (deleteItem) {
          listItem.remove();

          // Remove from local storage
          removeTaskFromLocalStorage(listItem);
      }
}

// Remove from local storage function
function removeTaskFromLocalStorage(taskItem) {
      let tasks;
      if (localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
          tasks.splice(index, 1)
        }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Clear Tasks function
function clearTasks() {
      if (confirm('Are you sure you want clear all items?')) {
      taskList.innerHTML = '';
      }

    // Clear from local storage
      clearTasksFromLocalStorage();
}

// Clear tasks from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}
