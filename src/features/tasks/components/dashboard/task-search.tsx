import { useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTaskFilterStore } from '@/features/tasks/stores/use-task-filter-store';

export default function TaskSearch() {
  const { searchQuery, setSearchQuery } = useTaskFilterStore();

  const handleClear = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  return (
    <div className="relative w-full sm:w-full sm:max-w-sm">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleChange}
        className="pr-10 pl-10"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 transform"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
