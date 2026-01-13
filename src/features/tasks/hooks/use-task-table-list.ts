import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import type { Task } from '../libs/types';
import { useTaskStore } from '../stores/use-task-store';
import useFilterTasks from './use-filter-tasks';

export default function useTaskTableList() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [editTask, setEditTask] = useState<null | Task>(null);
  const [deleteTask, setDeleteTask] = useState<null | Task>(null);

  const isLoading = useTaskStore(state => state.isLoading);
  const setIsLoading = useTaskStore(state => state.setIsLoading);
  const tasks = useFilterTasks();

  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // this size is used to calculate the height of the TableRow
    overscan: 10,
    enabled: !isLoading, // this will disable the virtualizer when isLoading is true
  });

  useEffect(() => {
    setIsLoading(true);
    Promise.resolve().then(() => {
      // throw new Error('Something went wrong');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, [setIsLoading]);

  return {
    isLoading,
    rowVirtualizer,
    setDeleteTask,
    setEditTask,
    editTask,
    deleteTask,
    parentRef,
    tasks,
  };
}
