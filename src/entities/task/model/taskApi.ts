import type { Task } from './task';


const STORAGE_KEY = 'tasks';

function getTasksFromStorage(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTasksToStorage(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function delay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export const taskApi = {
  async fetchTasks(): Promise<Task[]> {
    return delay(getTasksFromStorage());
  },

  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
    };
    const tasks = getTasksFromStorage();
    tasks.push(newTask);
    saveTasksToStorage(tasks);
    return delay(newTask);
  },

  async updateTask(task: Task): Promise<Task> {
    const tasks = getTasksFromStorage();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      saveTasksToStorage(tasks);
    }
    return delay(task);
  },

  async deleteTask(id: string | number): Promise<void> {
    const tasks = getTasksFromStorage().filter((t) => t.id !== id);
    saveTasksToStorage(tasks);
    return delay(undefined);
  },
  async searchTasks(query: string): Promise<Task[]> {
  const all = getTasksFromStorage();
  const lowerQuery = query.toLowerCase();

  const filtered = all.filter((task) => {
    return (
      task.title.toLowerCase().includes(lowerQuery) ||
      task.createdAt.toLowerCase().includes(lowerQuery)
    );
  });

  return delay(filtered);
  },
  async getTaskById(id: string): Promise<Task | undefined> {
    const tasks = getTasksFromStorage();
    return delay(tasks.find((task) => task.id === id));
  }
};
