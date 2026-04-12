// This file manages opening, closing, and handling interactions within modal dialogs.
// It controls user input inside modals and updates task data based on user actions.

import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";
import { renderTasks } from "./render.js";

export function setupModalCloseHandler() {
  const taskModal = document.getElementById("task-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const taskForm = document.getElementById("task-form");
  const deleteBtn = document.getElementById("delete-task-btn");

  if (closeModalBtn && taskModal) {
    closeModalBtn.addEventListener("click", (e) => {
      e.preventDefault();
      taskModal.close();
    });
  }

  if (taskModal) {
    taskModal.addEventListener("click", (e) => {
      if (e.target === taskModal) {
        taskModal.close();
      }
    });
  }

  if (taskForm && taskModal) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const taskId = Number(taskModal.dataset.taskId);
      const titleInput = document.getElementById("task-title");
      const descInput = document.getElementById("task-desc");
      const statusSelect = document.getElementById("task-status");
      const prioritySelect = document.getElementById("task-priority");

      if (
        !titleInput ||
        !descInput ||
        !statusSelect ||
        !prioritySelect ||
        !taskId
      ) {
        return;
      }

      const tasks = loadTasksFromStorage();
      const taskIndex = tasks.findIndex((task) => Number(task.id) === taskId);

      if (taskIndex === -1) return;

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        status: statusSelect.value,
        priority: prioritySelect.value,
      };

      saveTasksToStorage(tasks);
      renderTasks(tasks);
      taskModal.close();
    });
  }

  if (deleteBtn && taskModal) {
    deleteBtn.addEventListener("click", () => {
      const taskId = Number(taskModal.dataset.taskId);
      if (!taskId) return;

      const tasks = loadTasksFromStorage();
      const updatedTasks = tasks.filter((task) => Number(task.id) !== taskId);

      saveTasksToStorage(updatedTasks);
      renderTasks(updatedTasks);
      taskModal.close();
    });
  }
}

export function setupNewTaskModalHandler() {
  const addTaskBtn = document.getElementById("add-new-task-btn");
  const newTaskModal = document.getElementById("new-task-dialog");
  const cancelAddBtn = document.getElementById("cancel-add-btn");
  const newTaskForm = document.getElementById("new-task-modal-window");

  if (!newTaskModal || !addTaskBtn || !newTaskForm) {
    console.error("Modal, button, or form not found in DOM");
    return;
  }

  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    newTaskModal.showModal();
  });

  if (cancelAddBtn) {
    cancelAddBtn.addEventListener("click", (e) => {
      e.preventDefault();
      newTaskModal.close();
    });
  }

  newTaskModal.addEventListener("click", (e) => {
    if (e.target === newTaskModal) {
      newTaskModal.close();
    }
  });

  newTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const titleInput = document.getElementById("title-input");
    const descInput = document.getElementById("desc-input");
    const statusSelect = document.getElementById("select-status");
    const prioritySelect = document.getElementById("select-priority");

    if (!titleInput || !descInput || !statusSelect || !prioritySelect) {
      return;
    }

    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    const status = statusSelect.value;
    const priority = prioritySelect.value;

    if (!title || !description) return;

    const tasks = loadTasksFromStorage();

    const newTask = {
      id: generateTaskId(tasks),
      title,
      description,
      status,
      priority,
      board: "Launch Career",
    };

    tasks.push(newTask);
    saveTasksToStorage(tasks);
    renderTasks(tasks);

    newTaskForm.reset();
    newTaskModal.close();
  });
}

function generateTaskId(tasks) {
  if (!tasks.length) return 1;
  return Math.max(...tasks.map((task) => Number(task.id) || 0)) + 1;
}
