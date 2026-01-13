import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CreateTaskInput, Task, UpdateTaskInput } from '../libs/types';
import { taskData } from '../libs/tasks-data';

type TaskStore = {
  tasks: Task[];
  addTask: (input: CreateTaskInput) => void;
  updateTask: (input: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  markTaskAsCompleted: (id: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: taskData,
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
      markTaskAsCompleted: (id: string) => {
        const tasks = get().tasks.map(task =>
          task.id === id
            ? {
                ...task,
                status: task.status === 'completed' ? 'todo' : 'completed',
                updatedAt: new Date().toISOString(),
              }
            : task
        ) as Task[];
        return set(() => ({
          tasks: tasks,
        }));
      },
    }),
    {
      name: 'tasks-storage',
    }
  )
);
