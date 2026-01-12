import { useMemo } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { useTaskFilter } from '../stores/use-task-filter';
import { useTaskStore } from '../stores/use-task-store';

export default function useFilterTasks() {
  const tasks = useTaskStore(state => state.tasks);
  const searchQuery = useTaskFilter(state => state.searchQuery);

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

    return result;
  }, [searchValue, tasks]);

  return { searchValue, tasks: filteredtask };
}
