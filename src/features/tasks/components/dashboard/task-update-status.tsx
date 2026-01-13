import { Checkbox } from '@/components/ui/checkbox';
import type { Task } from '../../libs/types';
import { useTaskStore } from '../../stores/use-task-store';

export default function TaskUpdateStatus({ task }: { task: Task }) {
  const markTaskAsCompleted = useTaskStore(state => state.markTaskAsCompleted);
  return (
    <Checkbox
      checked={task.status === 'completed'}
      onCheckedChange={() => markTaskAsCompleted(task.id)}
      aria-label="Mark task as complete"
      className="h-5 w-5"
    />
  );
}
