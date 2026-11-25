import { Task } from "./definitions";

const STORAGE_KEY = "genius-task";

export function loadDataFromStorage(): Task[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch (err) {
    console.log("Failed to load tasks from localStorage: ", err);
    return [];
  }
}

export function saveTasksToStorage(tasks: Task[]) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.log("Failed to save tasks to localStorage: ", err);
  }
}
