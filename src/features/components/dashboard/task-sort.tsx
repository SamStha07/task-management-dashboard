import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SortField } from '@/features/libs/types';
import { useTaskFilter } from '@/features/stores/use-task-filter';

const sortOptions: { label: string; value: SortField }[] = [
  { label: 'Due Date', value: 'dueDate' },
  { label: 'Priority', value: 'priority' },
  { label: 'Created Date', value: 'createdAt' },
];

export default function TaskSort() {
  const { sort, setSort } = useTaskFilter();

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
