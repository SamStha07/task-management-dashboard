import { Badge } from '@/components/ui/badge';
import type { TaskStatus } from '../../libs/types';

const statusColors = {
  todo: 'bg-slate-50 text-slate-700 dark:bg-slate-900/50 dark:text-slate-400 border border-slate-200 dark:border-slate-800',
  'in-progress':
    'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50',
  completed:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50',
};

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export default function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <Badge className={`${statusColors[status]} capitalize`}>
      {status === 'in-progress' ? 'In Progress' : status}
    </Badge>
  );
}
