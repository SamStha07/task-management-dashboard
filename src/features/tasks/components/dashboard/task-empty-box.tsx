import { TableCell, TableRow } from '@/components/ui/table';
import { useTaskStore } from '../../stores/use-task-store';

export default function TaskEmptyBox() {
  const tasksData = useTaskStore(state => state.tasks);
  return (
    <TableRow className="w-full">
      <TableCell colSpan={7} className="py-10 text-center">
        <p className="mb-1 text-base text-slate-600 dark:text-slate-400">
          No tasks found
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500">
          {tasksData.length === 0 && 'Create a new task to get started'}
        </p>
      </TableCell>
    </TableRow>
  );
}
