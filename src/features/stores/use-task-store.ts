import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CreateTaskInput, Task } from '../libs/types';

type TaskStore = {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: input => {
        const now = new Date().toISOString();
        const newTask: Task = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        return set(() => ({
          tasks: [newTask, ...get().tasks],
        }));
      },
    }),
    {
      name: 'tasks-storage', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
