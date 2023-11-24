const button = document.getElementById("btn");
const toDoInput = document.querySelector("#task-input");
let Taskcontainer = document.getElementById("containerTasks");

button.addEventListener("click", function () {
  const inputValue = toDoInput.value;
  const tableRow = document.createElement("tr");
  const tableHTML = `
    
    <tr class="table-Row">
      <td><span class='inputText'>${inputValue}</span></td>
      <td>  <i class="fas fa-edit fa-lg"></i></td>
      <td> <i class="fas fa-trash fa-lg"></i></td>
      <td><i class="fas fa-check task-checkbox"></i></td>
    </tr>
    `;
  // Structure of the list item
  tableRow.innerHTML = tableHTML;

  // Check off event
  tableRow
    .querySelector(".task-checkbox")
    .addEventListener("click", function () {
      tableRow.style.textDecoration = "line-through";
    });

  // Edit task event
  tableRow.querySelector(".fas.fa-edit").addEventListener("click", function () {
    const newText = prompt("Edit List Item:", inputValue);
    if (newText !== null) {
      tableRow.querySelector(".inputText").textContent = newText;
      updateLocalStorage();
    }
  });

  // Delete task event
  tableRow
    .querySelector(".fas.fa-trash")
    .addEventListener("click", function () {
      Taskcontainer.removeChild(tableRow);
      removeTaskFromLocalStorage(inputValue);
      updateLocalStorage();
    });

  // Append to the container
  Taskcontainer.appendChild(tableRow);
  updateLocalStorage();
  toDoInput.value = ""; // Clear the input
});

// Load from local storage upon initialization
function loadFromLocalStorage() {
  const storedTasks = JSON.parse(localStorage.getItem("listItem")) || [];
  storedTasks.forEach((taskText) => {
    toDoInput.value = taskText;
    button.click(); // Trigger the add task button
  });
}

// Update local storage with the current task list
function updateLocalStorage() {
  const rows = Array.from(Taskcontainer.querySelectorAll("tr"));
  const firstColumnCells = rows.slice(1).map((row) => row.cells[0]);
  const taskTexts = firstColumnCells.map((cell) => cell.textContent.trim());
  localStorage.setItem("listItem", JSON.stringify(taskTexts));
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskValue) {
  const storedTasks = JSON.parse(localStorage.getItem("listItem")) || [];
  const updatedTasks = storedTasks.filter((task) => task !== taskValue);
  localStorage.setItem("listItem", JSON.stringify(updatedTasks));
}

loadFromLocalStorage();
