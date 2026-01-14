import { memo, useMemo } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Task } from '@/features/tasks/libs/types';
import TaskStatusBadge from './task-status-badge';
import TaskDueDate from './task-due-date';
import TaskTags from './task-tags';
import TaskPriority from './task-priority';
import TaskTitleDescription from './task-title-description';
import TaskUpdateStatus from './task-update-status';
import type { VirtualItem } from '@tanstack/react-virtual';

interface TaskListRowProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  virtualRow: VirtualItem;
  index: number;
}

const TaskListRow = memo(
  ({ task, onDelete, onEdit, virtualRow, index }: TaskListRowProps) => {
    const rowStyle = useMemo(
      () => ({
        height: `${virtualRow.size}px`,
        transform: `translateY(${
          virtualRow.start - index * virtualRow.size
        }px)`,
      }),
      [virtualRow.size, virtualRow.start, index]
    );
    return (
      <TableRow key={task.id} style={rowStyle}>
        <TableCell>
          <TaskUpdateStatus task={task} />
        </TableCell>
        <TableCell>
          <TaskTitleDescription task={task} />
        </TableCell>
        <TableCell>
          <TaskPriority priority={task.priority} />
        </TableCell>
        <TableCell>
          <TaskStatusBadge status={task.status} />
        </TableCell>
        <TableCell>
          <TaskDueDate task={task} />
        </TableCell>
        <TableCell>
          <TaskTags task={task} />
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-white/80"
              title="Edit task"
              onClick={() => onEdit(task)}
            >
              <Edit2 className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-white/80"
              title="Delete task"
              onClick={() => onDelete(task)}
            >
              <Trash2 className="h-3.5 w-3.5 text-red-500" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
);

export default TaskListRow;
