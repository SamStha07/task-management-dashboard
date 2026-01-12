import { useMemo } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { useTaskFilter } from '../stores/use-task-filter';
import { useTaskStore } from '../stores/use-task-store';

export default function useFilterTasks() {
  const tasks = useTaskStore(state => state.tasks);
  const searchQuery = useTaskFilter(state => state.searchQuery);
  const status = useTaskFilter(state => state.status);
  const sort = useTaskFilter(state => state.sort);

  const searchValue = useDebounce(searchQuery, 400);

  const filteredtask = useMemo(() => {
    let result = [...tasks];

    if (searchValue.trim()) {
      const value = searchValue.trim().toLowerCase();
      //  will filter tasks based on title and description
      result = result.filter(
        task =>
          task.title.toLowerCase().includes(value) ||
          task.description.toLowerCase().includes(value)
      );
    }

    if (status !== 'all') {
      result = result.filter(task => task.status === status);
    }

    result.sort((a, b) => {
      // new task will be at top
      if (sort === 'createdAt') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      // task will be sorted based on which task is about to end
      if (sort === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      //  critical task will be shown at first
      if (sort === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3, critical: 4 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return result;
  }, [searchValue, tasks, status, sort]);

  return filteredtask;
}
