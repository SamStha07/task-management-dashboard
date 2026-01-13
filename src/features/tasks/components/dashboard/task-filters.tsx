import { Button } from '@/components/ui/button';
import type { TaskStatus } from '@/features/tasks/libs/types';
import { useTaskFilterStore } from '@/features/tasks/stores/use-task-filter-store';

const filterOptions: { label: string; value: TaskStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

export default function TaskFilters() {
  const { setStatus, status } = useTaskFilterStore();

  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map(option => (
        <Button
          key={option.value}
          size="sm"
          variant={status === option.value ? 'default' : 'outline'}
          onClick={() => setStatus(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
