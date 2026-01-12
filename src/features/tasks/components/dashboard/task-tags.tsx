import { Badge } from '@/components/ui/badge';
import type { Task } from '../../libs/types';

interface TaskTagsProps {
  task: Task;
}

export default function TaskTags({ task }: TaskTagsProps) {
  return (
    <div>
      {!task.tags ? (
        <span className="text-muted-foreground text-xs italic">No tags</span>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {task.tags?.map((tag, index) => (
            <Badge key={index} variant="outline" className="px-2 py-0.5">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
