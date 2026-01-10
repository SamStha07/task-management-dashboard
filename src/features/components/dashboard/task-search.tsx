import { useCallback, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TaskSearch() {
  const [searchValue, setSearchValue] = useState('');

  const handleClear = useCallback(() => {
    setSearchValue('');
  }, []);

  return (
    <div>
      <div className="relative w-full max-w-sm">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input
          type="text"
          placeholder="Search tasks..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="pr-10 pl-10"
        />
        {searchValue && (
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
    </div>
  );
}
