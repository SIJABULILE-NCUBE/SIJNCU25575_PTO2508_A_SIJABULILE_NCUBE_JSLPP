/*
  This file handles saving and loading tasks using localStorage.
  It ensures that task data is stored and remains available after refreshing the page.
*/

import { initialTasks } from "../../initialData.js";

export function loadTasksFromStorage() {
  const stored = localStorage.getItem("tasks");

  if (stored) {
    try {
      const parsedTasks = JSON.parse(stored);

      if (Array.isArray(parsedTasks)) {
        return parsedTasks;
      }

      throw new Error("Stored tasks are not an array.");
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
      localStorage.setItem("tasks", JSON.stringify(initialTasks));
      return initialTasks;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(initialTasks));
  return initialTasks;
}

export function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

