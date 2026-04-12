// This file handles rendering tasks onto the screen and updating the UI when task data changes.
// It ensures the correct tasks are displayed in their respective sections based on status.

import { createTaskElement } from "./taskElement.js";

export function clearExistingTasks() {
  const tasksContainers = document.querySelectorAll(".tasks-container");
  tasksContainers.forEach((container) => {
    container.innerHTML = "";
  });
}

export function renderTasks(tasks) {
  clearExistingTasks();

  const todoColumn = document.querySelector('.column-div[data-status="todo"]');
  const doingColumn = document.querySelector('.column-div[data-status="doing"]');
  const doneColumn = document.querySelector('.column-div[data-status="done"]');

  const todoContainer = todoColumn?.querySelector(".tasks-container");
  const doingContainer = doingColumn?.querySelector(".tasks-container");
  const doneContainer = doneColumn?.querySelector(".tasks-container");

  const tasksByStatus = {
    todo: tasks.filter((task) => task.status === "todo"),
    doing: tasks.filter((task) => task.status === "doing"),
    done: tasks.filter((task) => task.status === "done"),
  };

  const counts = {
    todo: tasksByStatus.todo.length,
    doing: tasksByStatus.doing.length,
    done: tasksByStatus.done.length,
  };

  tasksByStatus.todo.forEach((task) => {
    todoContainer?.appendChild(createTaskElement(task));
  });

  tasksByStatus.doing.forEach((task) => {
    doingContainer?.appendChild(createTaskElement(task));
  });

  tasksByStatus.done.forEach((task) => {
    doneContainer?.appendChild(createTaskElement(task));
  });

  updateColumnHeaderCounts(todoColumn, doingColumn, doneColumn, counts);
}

function updateColumnHeaderCounts(todoColumn, doingColumn, doneColumn, counts) {
  const todoHeader = todoColumn?.querySelector(".columnHeader");
  const doingHeader = doingColumn?.querySelector(".columnHeader");
  const doneHeader = doneColumn?.querySelector(".columnHeader");

  if (todoHeader) todoHeader.textContent = `TODO (${counts.todo})`;
  if (doingHeader) doingHeader.textContent = `DOING (${counts.doing})`;
  if (doneHeader) doneHeader.textContent = `DONE (${counts.done})`;
}

