import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CreateTaskInput, Task, UpdateTaskInput } from '../libs/types';

type TaskStore = {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => void;
  updateTask: (input: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
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
      updateTask: (input: UpdateTaskInput) => {
        const tasks = get().tasks.map(task =>
          task.id === input.id
            ? {
                ...task,
                ...input,
                updatedAt: new Date().toISOString(),
              }
            : task
        );
        return set(() => ({
          tasks: tasks,
        }));
      },
      deleteTask: (id: string) => {
        const filteredTasks = get().tasks.filter(task => task.id !== id);
        return set(() => ({
          tasks: filteredTasks,
        }));
      },
    }),
    {
      name: 'tasks-storage', // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
