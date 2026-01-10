import type { TaskStatus } from '../libs/types';

export function checkOverdue({
  dueDate,
  status,
}: {
  dueDate: string;
  status: TaskStatus;
}) {
  return new Date(dueDate) < new Date() && status !== 'completed';
}
