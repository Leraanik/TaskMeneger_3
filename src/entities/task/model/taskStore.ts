import { create } from 'zustand';
import type { Task } from './task';
import { taskApi } from './taskApi';

type TaskStore = {
  tasks: Task[];
  loading: boolean;           
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  searchTasks: (query: string) => Promise<void>;
};


export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,             

fetchTasks: async () => {
  set({ loading: true });
  try {
    const data = await taskApi.fetchTasks();
    set({ tasks: data, loading: false });
  } catch (e) {
    console.error(e);
    set({ loading: false });
  }
},

  createTask: async (task) => {
    set({ loading: true });
    try {
      await taskApi.createTask(task);
      const data = await taskApi.fetchTasks();
      set({ tasks: data, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },

  updateTask: async (task) => {
    set({ loading: true });
    try {
      await taskApi.updateTask(task);
      const data = await taskApi.fetchTasks();
      set({ tasks: data, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true });
    try {
      await taskApi.deleteTask(id);
      const data = await taskApi.fetchTasks();
      set({ tasks: data, loading: false });
    } catch (e) {
      set({ loading: false });
    }
  },
  searchTasks: async (query) => {
  const results = await taskApi.searchTasks(query);
  set({ tasks: results });
},

}));

