/*
  This is the main entry point of the app. It initializes the task board by loading tasks from storage, rendering them, and setting up all event handlers (like modals, theme, and sidebar).
*/

import { loadTasksFromStorage } from "./utils/localStorage.js";
import { renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
} from "./ui/modalHandlers.js";
import {
  setupThemeHandlers,
  setupSidebarHandlers,
  setupMobileMenuHandlers,
} from "./ui/appHandlers.js";

function initTaskBoard() {
  const tasks = loadTasksFromStorage();

  renderTasks(tasks);
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupThemeHandlers();
  setupSidebarHandlers();
  setupMobileMenuHandlers();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);

