"use client";

import { loadDataFromStorage, saveTasksToStorage } from "@/app/lib/data";
import { Task } from "@/app/lib/definitions";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FilterType = "all" | "todo" | "important" | "completed";

interface TaskContextValue {
  tasks: Task[];
  isLoaded: boolean;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  todoCount: number;
  importantCount: number;
  completedCount: number;
  addTask: (taxt: string, important: boolean) => void;
  updateTask: (updated: Task) => void;
  toggleComplete: (id: string, checked: boolean) => void;
  toggleImportant: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTasks(loadDataFromStorage());
      setIsLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks);
    }
  }, [tasks, isLoaded]);

  const commitTasks = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasks((prev) => {
      const next = updater(prev);
      saveTasksToStorage(next);
      return next;
    });
  }, []);

  const addTask = useCallback(
    (text: string, important: boolean) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const created: Task = {
        id: crypto.randomUUID(),
        text: trimmed,
        important,
        isCompleted: false,
        createAt: new Date().toISOString(),
      };

      commitTasks((prev) => [created, ...prev]);
    },
    [commitTasks],
  );

  const updateTask = useCallback(
    (updated: Task) => {
      commitTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task)),
      );
    },
    [commitTasks],
  );

  const toggleComplete = useCallback(
    (id: string, checked: boolean) => {
      commitTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, isCompleted: checked } : task,
        ),
      );
    },
    [commitTasks],
  );

  const toggleImportant = useCallback(
    (id: string) => {
      commitTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, important: !task.important } : task,
        ),
      );
    },
    [commitTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      commitTasks((prev) => prev.filter((task) => task.id !== id));
    },
    [commitTasks],
  );

  const counts = useMemo(() => {
    return {
      todoCount: tasks.filter((task) => !task.isCompleted).length,
      importantCount: tasks.filter((task) => task.important).length,
      completedCount: tasks.filter((task) => task.isCompleted).length,
    };
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      isLoaded,
      filter,
      setFilter,
      ...counts,
      addTask,
      updateTask,
      toggleComplete,
      toggleImportant,
      deleteTask,
    }),
    [
      tasks,
      isLoaded,
      filter,
      counts,
      addTask,
      updateTask,
      toggleComplete,
      toggleImportant,
      deleteTask,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) {
    throw new Error("useTasks must be within a TaskProvider");
  }

  return ctx;
}
