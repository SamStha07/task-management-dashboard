import { checkOverdue } from '../../utils/check-overdue';
import type { Task } from '../../libs/types';
import { dateFormat } from '../../libs/date-format';
import { Calendar } from 'lucide-react';

interface TaskDueDateProps {
  task: Task;
}

export default function TaskDueDate({ task }: TaskDueDateProps) {
  const isOverdue = checkOverdue({
    dueDate: task.dueDate,
    status: task.status,
  });

  return (
    <div
      className={`flex items-center gap-1.5 text-xs ${
        isOverdue && 'font-medium text-red-600 dark:text-red-500'
      }`}
    >
      <Calendar className="h-3.5 w-3.5" />
      <span>
        {dateFormat(task.dueDate)}
        {isOverdue && ' (Overdue)'}
      </span>
    </div>
  );
}
