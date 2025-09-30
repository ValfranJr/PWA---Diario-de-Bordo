const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const dateInput = document.querySelector("#date");
const addButton = document.querySelector(".add-button");
const listContainer = document.querySelector(".list-container");

let tasks = [];

// carrega dados do localStorage
const loadTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
};

// salva dados no localStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// // renderiza os dados no DOM
const renderTasks = () => {
  listContainer.innerHTML = "";
  tasks.forEach((task) => {
    const newItem = document.createElement("div");
    newItem.classList.add("item");

    const title = document.createElement("h2");
    title.textContent = task.title;
    newItem.appendChild(title);

    const description = document.createElement("p");
    description.textContent = task.description;
    newItem.appendChild(description);

    const date = document.createElement("p");
    date.textContent = task.date;
    newItem.appendChild(date);

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-alt");
    deleteButton.addEventListener("click", () => {
      newItem.remove();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
    });
    newItem.appendChild(deleteButton);

    listContainer.appendChild(newItem);
  });
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
};

// validar campos obrigatórios
const validateInputs = () => {
  const titleValid = titleInput.value.trim().length > 0;
  const descriptionValid = descriptionInput.value.trim().length > 0;
  const dateValid = dateInput.value.trim().length > 0;

  titleInput.classList.toggle("error", !titleValid);
  descriptionInput.classList.toggle("error", !descriptionValid);
  dateInput.classList.toggle("error", !dateValid);

  return titleValid && descriptionValid && dateValid;
};

// adicionar nova atividade
const handleAddTasks = () => {
  if (!validateInputs()) return;

  const newTask = {
    title: titleInput.value,
    description: descriptionInput.value,
    date: dateInput.value,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  titleInput.value = "";
  descriptionInput.value = "";
  dateInput.value = "";
};

loadTasks();

addButton.addEventListener("click", handleAddTasks);
