const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const dateInput = document.querySelector("#date");
const addButton = document.querySelector(".add-button");
const listContainer = document.querySelector(".list-container");

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

    const newItem = document.createElement("div");
    newItem.classList.add("item");

    const title = document.createElement("h2");
    title.textContent = titleInput.value;
    newItem.appendChild(title);

    const description = document.createElement("p");
    description.textContent = descriptionInput.value;
    newItem.appendChild(description);

    const date = document.createElement("p");
    date.textContent = dateInput.value;
    newItem.appendChild(date);

    const deleteButton = document.createElement("i");
    deleteButton.classList.add("fas", "fa-trash-alt");
    deleteButton.addEventListener("click", () => {
        newItem.remove();
    });
    newItem.appendChild(deleteButton);

    listContainer.appendChild(newItem);

    titleInput.value = "";
    descriptionInput.value = "";
    dateInput.value = "";
};


addButton.addEventListener("click", handleAddTasks);
