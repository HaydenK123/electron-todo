let tasks = [];

async function loadTasks() {
  tasks = await window.electronAPI.loadTasks();
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.done) {
      li.classList.add('done');
    }

    li.addEventListener('click', () => toggleTask(index));
    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();

  if (taskText !== '') {
    tasks.push({ text: taskText, done: false });
    input.value = '';
    renderTasks(); // Only update the screen — no save yet
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks(); 
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('saveTasksBtn').addEventListener('click', () => window.electronAPI.saveTasks(tasks));
document.getElementById('loadTasksBtn').addEventListener('click', loadTasks);


