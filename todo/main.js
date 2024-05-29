// Função para adicionar tarefa
async function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  console.log('taskTitle:', taskTitle);
  console.log('taskDescription:', taskDescription);

  try {
    const response = await fetch('http://localhost:5500/tarefa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: taskTitle, description: taskDescription })
    });
    const newTask = await response.json();

    addTaskToDOM(newTask);
    form.reset();
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
}

function addTaskToDOM(task) {
  const taskList = document.querySelector('#taskList');

  const li = document.createElement('li');
  li.id = task._id;
  li.innerHTML = `
    <h2>${task.title}</h2>
    <p>${task.description}</p>
    <button class="editButton" onclick="openEditDialog('${task._id}')" title="Editar tarefa">✏️</button>
    <button class="deleteButton" onclick="deleteTask('${task._id}')" title="Remover tarefa">🗑️</button>
  `;

  taskList.appendChild(li);
}

// Carregar tarefas do backend ao recarregar a página
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:5500/tarefas');
    const tasks = await response.json();

    tasks.forEach(addTaskToDOM);
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
});

// Função para abrir o diálogo de edição
function openEditDialog(taskId) {
  fetch(`http://localhost:5500/tarefa/${taskId}`)
    .then(response => response.json())
    .then(task => {
      document.querySelector('#editTaskId').value = task._id;
      document.querySelector('#editTitle').value = task.title;
      document.querySelector('#editDescription').value = task.description;
      document.querySelector('#editDialog').showModal();
    })
    .catch(error => console.error('Erro ao buscar tarefa:', error));
}

// Função para fechar o diálogo de edição
function closeEditDialog() {
  document.querySelector('#editDialog').close();
}

// Função para editar tarefa
async function editTask(event) {
  event.preventDefault();

  const taskId = document.querySelector('#editTaskId').value;
  const taskTitle = document.querySelector('#editTitle').value;
  const taskDescription = document.querySelector('#editDescription').value;

  try {
    const response = await fetch(`http://localhost:5500/tarefa/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: taskTitle, description: taskDescription })
    });
    const updatedTask = await response.json();

    updateTaskInDOM(updatedTask);
    closeEditDialog();
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
  }
}

function updateTaskInDOM(task) {
  const li = document.getElementById(task._id);
  li.querySelector('h2').textContent = task.title;
  li.querySelector('p').textContent = task.description;
}

// Função para excluir tarefa
async function deleteTask(taskId) {
  try {
    await fetch(`http://localhost:5500/tarefa/${taskId}`, {
      method: 'DELETE'
    });

    document.getElementById(taskId).remove();
  } catch (error) {
    console.error('Erro ao remover tarefa:', error);
  }
}
