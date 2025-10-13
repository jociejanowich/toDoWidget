// Date Setup
const today = new Date();
document.getElementById("dayName").textContent = today.toLocaleDateString("en-US", { weekday: "long" });
document.getElementById("dayNumber").textContent = today.getDate();
document.getElementById("monthName").textContent = today.toLocaleDateString("en-US", { month: "long" });

// Elements
const newTask = document.getElementById("newTask");
const addBtn = document.getElementById("addBtn");
const tasksContainer = document.querySelector(".tasks-container");

// Add Task
addBtn.addEventListener("click", e => {
  e.preventDefault();
  const taskText = newTask.value.trim();
  if (!taskText) return;

  const task = document.createElement("div");
  task.className = "task";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.addEventListener("change", updateProgress);

  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✖";
  removeBtn.style.background = "transparent";
  removeBtn.style.border = "none";
  removeBtn.addEventListener("click", () => {
    task.remove();
    updateProgress();
  });

  task.appendChild(checkBox);
  task.appendChild(textSpan);
  task.appendChild(removeBtn);
  tasksContainer.appendChild(task);

  newTask.value = "";
  updateProgress();
});

// Update Progress
function updateProgress() {
  const checkBoxes = document.querySelectorAll(".task input[type='checkbox']");
  const checked = Array.from(checkBoxes).filter(cb => cb.checked).length;
  const total = checkBoxes.length;

  const progressPercent = total === 0 ? 0 : (checked / total) * 100;
  document.querySelector(".progress-fill").style.width = `${progressPercent}%`;

  document.getElementById("progress-label").textContent = `${checked} / ${total} tasks done`;
}
