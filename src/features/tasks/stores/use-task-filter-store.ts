import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SortField, TaskStatus } from '../libs/types';

type TaskFilterStore = {
  status: TaskStatus | 'all';
  searchQuery: string;
  sort: SortField;
  setStatus: (status: TaskStatus | 'all') => void;
  setSearchQuery: (search: string) => void;
  setSort: (sort: SortField) => void;
};

export const useTaskFilterStore = create<TaskFilterStore>()(
  persist(
    set => ({
      status: 'all',
      searchQuery: '',
      sort: 'createdAt',
      setStatus: (status: TaskStatus | 'all') => {
        return set(() => ({
          status: status,
        }));
      },
      setSearchQuery: (search: string) => {
        return set(() => ({
          searchQuery: search,
        }));
      },
      setSort: (sort: SortField) => {
        return set(() => ({
          sort: sort,
        }));
      },
    }),
    {
      name: 'tasks-filter-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
