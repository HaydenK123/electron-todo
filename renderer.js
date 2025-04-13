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
    if (task.done) li.style.textDecoration = 'line-through';
    li.onclick = () => toggleTask(index);
    list.appendChild(li);
  });
  window.electronAPI.saveTasks(tasks);
}

function addTask() {
  const input = document.getElementById('taskInput');
  if (input.value.trim() !== '') {
    tasks.push({ text: input.value, done: false });
    input.value = '';
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

loadTasks();
