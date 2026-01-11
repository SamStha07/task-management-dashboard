import { useRef } from 'react';
import { Calendar, Edit2, Trash2 } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
// import { taskData } from '@/features/libs/tasks-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { checkOverdue } from '@/features/utils/check-overdue';
import { dateFormat } from '@/features/libs/date-format';
import TaskFormDialog from './task-form-dialog';
import TaskDeleteDialog from './task-delete-dialog';
import { useTaskStore } from '@/features/stores/use-task-store';

const priorityColors = {
  low: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50',
  medium:
    'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50',
  high: 'bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50',
  critical:
    'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400 border border-red-200 dark:border-red-900/50',
};

const statusColors = {
  todo: 'bg-slate-50 text-slate-700 dark:bg-slate-900/50 dark:text-slate-400 border border-slate-200 dark:border-slate-800',
  'in-progress':
    'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50',
  completed:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50',
};

export default function TaskList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const tasks = useTaskStore(state => state.tasks);

  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 20,
  });

  return (
    <div
      className="mt-6"
      ref={parentRef}
      style={{
        height: '500px',
        overflow: 'auto',
      }}
    >
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="w-[200px] lg:w-[600px]">Task</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
              const task = tasks[virtualRow.index];

              const isOverdue = checkOverdue({
                dueDate: task.dueDate,
                status: task.status,
              });

              return (
                <TableRow
                  key={task.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={false}
                      onCheckedChange={() => {}}
                      aria-label="Mark task as complete"
                      className="h-5 w-5"
                    />
                  </TableCell>
                  <TableCell className="">
                    <div className="w-[200px] lg:w-[600px]">
                      <h2 className="font-medium first-letter:capitalize">
                        {task.title}
                      </h2>
                      <p className="truncate first-letter:capitalize">
                        {task.description} aksd jasdj asjdb jas bdjsab jasdas
                        jdasbdbasd asjdb sand asjkbdjasb djsa ashvd
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusColors[task.status]} capitalize`}
                    >
                      {task.status === 'in-progress'
                        ? 'In Progress'
                        : task.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center gap-1.5 text-xs ${
                        isOverdue &&
                        'font-medium text-red-600 dark:text-red-500'
                      }`}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {dateFormat(task.dueDate)}
                        {isOverdue && ' (Overdue)'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    <TaskFormDialog
                      task={task}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white/80"
                          title="Edit task"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Button>
                      }
                    />

                    <TaskDeleteDialog
                      task={task}
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white/80"
                          title="Delete task"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
