import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortField } from '@/features/tasks/libs/types';
import { useTaskFilterStore } from '@/features/tasks/stores/use-task-filter-store';

const sortOptions: { label: string; value: SortField }[] = [
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Priority', value: 'priority' },
  { label: 'Created Date', value: 'createdAt' },
];

export default function TaskSort() {
  const { sort, setSort } = useTaskFilterStore();

  return (
    <div className="flex items-center gap-2">
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
