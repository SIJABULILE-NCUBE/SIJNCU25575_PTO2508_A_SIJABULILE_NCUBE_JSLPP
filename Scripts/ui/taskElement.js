// This file is responsible for creating and displaying task elements in the UI, including handling user interactions.
// It also manages opening and populating the task details modal when a task is selected.

export function createTaskElement(task) {
  const taskCard = document.createElement("article");
  taskCard.className = "task-div";
  taskCard.setAttribute("data-task-id", task.id);
  taskCard.setAttribute("data-task-status", task.status);
  taskCard.setAttribute("role", "button");
  taskCard.setAttribute("tabindex", "0");

  taskCard.innerHTML = `
    <span class="task-title">${task.title}</span>
    <span class="priority-dot ${task.priority || "medium"}"></span>
  `;

  taskCard.addEventListener("click", () => {
    openTaskDetailsModal(task);
  });

  taskCard.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openTaskDetailsModal(task);
    }
  });

  return taskCard;
}

function openTaskDetailsModal(task) {
  const taskModal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");
  const prioritySelect = document.getElementById("task-priority");

  if (
    !taskModal ||
    !titleInput ||
    !descInput ||
    !statusSelect ||
    !prioritySelect
  ) {
    return;
  }

  titleInput.value = task.title || "";
  descInput.value = task.description || "";
  statusSelect.value = task.status || "todo";
  prioritySelect.value = task.priority || "medium";

  titleInput.disabled = false;
  descInput.disabled = false;
  statusSelect.disabled = false;
  prioritySelect.disabled = false;

  taskModal.setAttribute("data-task-id", task.id);

  try {
    taskModal.showModal();
  } catch (error) {
    console.error("Unable to open task detail modal:", error);
  }
}

