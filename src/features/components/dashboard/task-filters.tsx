import { Button } from '@/components/ui/button';
import type { TaskStatus } from '@/features/libs/types';

const filterOptions: { label: string; value: TaskStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'To Do', value: 'todo' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

export default function TaskFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      {filterOptions.map(option => (
        <Button key={option.value} size="sm">
          {option.label}
        </Button>
      ))}
    </div>
  );
}
