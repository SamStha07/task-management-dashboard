import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useDebounce from '@/hooks/use-debounce';
import { useTaskFilter } from '@/features/stores/use-task-filter';

export default function TaskSearch() {
  const { searchQuery, setSearchQuery } = useTaskFilter();
  const debounceValue = useDebounce(searchQuery, 300);
  console.log('🚀 ~ TaskSearch ~ debounceValue:', debounceValue);

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full sm:w-full sm:max-w-sm">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
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
