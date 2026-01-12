import { Badge } from '@/components/ui/badge';
import type { TaskPriority } from '../../libs/types';

const priorityColors = {
  low: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50',
  medium:
    'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50',
  high: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50',
  critical:
    'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900/50',
};

interface TaskPriorityProps {
  priority: TaskPriority;
}

export default function TaskPriority({ priority }: TaskPriorityProps) {
  return <Badge className={priorityColors[priority]}>{priority}</Badge>;
}
