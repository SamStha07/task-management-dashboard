import { useRef } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useTaskStore } from '@/features/tasks/stores/use-task-store';
import useFilterTasks from '@/features/tasks/hooks/use-filter-tasks';
import TaskFormDialog from './task-form-dialog';
import TaskDeleteDialog from './task-delete-dialog';
import TaskStatusBadge from './task-status-badge';
import TaskDueDate from './task-due-date';
import TaskTags from './task-tags';
import TaskPriority from './task-priority';

export default function TaskList() {
  const parentRef = useRef<HTMLDivElement>(null);
  const markTaskAsCompleted = useTaskStore(state => state.markTaskAsCompleted);
  const tasksData = useTaskStore(state => state.tasks);
  const tasks = useFilterTasks();

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
              <TableHead className="w-[200px] lg:w-[500px]">Task</TableHead>
              <TableHead className="w-[100px]">Priority</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          {tasks.length === 0 && (
            <TableBody>
              <TableRow className="w-full">
                <TableCell colSpan={7} className="py-10 text-center">
                  <p className="mb-1 text-base text-slate-600 dark:text-slate-400">
                    No tasks found
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    {tasksData.length === 0 &&
                      'Create a new task to get started'}
                  </p>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          <TableBody>
            {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
              const task = tasks[virtualRow.index];

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
                      checked={task.status === 'completed'}
                      onCheckedChange={() => markTaskAsCompleted(task.id)}
                      aria-label="Mark task as complete"
                      className="h-5 w-5"
                    />
                  </TableCell>
                  <TableCell className="">
                    <div className="w-[200px] lg:w-[500px]">
                      <h2
                        className={`font-medium first-letter:capitalize ${
                          task.status === 'completed'
                            ? 'text-slate-400 line-through dark:text-slate-600'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </h2>
                      <p
                        className={`truncate first-letter:capitalize ${
                          task.status === 'completed'
                            ? 'text-slate-400 line-through dark:text-slate-600'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {task.description}
                      </p>
                    </div>
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
