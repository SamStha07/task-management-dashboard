import { Suspense, lazy, useRef } from 'react';
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
import { Skeleton } from '@/components/ui/skeleton';
import useFilterTasks from '@/features/tasks/hooks/use-filter-tasks';
import TaskStatusBadge from './task-status-badge';
import TaskDueDate from './task-due-date';
import TaskTags from './task-tags';
import TaskPriority from './task-priority';
import TaskTitleDescription from './task-title-description';
import TaskUpdateStatus from './task-update-status';
import TaskEmptyBox from './task-empty-box';

const TaskFormDialog = lazy(() => import('./task-form-dialog'));
const TaskDeleteDialog = lazy(() => import('./task-delete-dialog'));

export default function TaskList() {
  const parentRef = useRef<HTMLDivElement>(null);

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

          <TableBody>
            {/* show empty box when no tasks */}
            {tasks.length === 0 && <TaskEmptyBox />}
            {/* show virtualized tasks */}
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
                    <TaskUpdateStatus task={task} />
                  </TableCell>
                  <TableCell>
                    <div className="w-[200px] lg:w-[500px]">
                      <TaskTitleDescription task={task} />
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Suspense fallback={<Skeleton className="h-8 w-8" />}>
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
                      </Suspense>

                      <Suspense fallback={<Skeleton className="h-8 w-8" />}>
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
                      </Suspense>
                    </div>
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
