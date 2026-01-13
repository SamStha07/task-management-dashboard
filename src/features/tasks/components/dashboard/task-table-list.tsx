import { Suspense, lazy } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TaskEmptyBox from './task-empty-box';
import TaskListRow from './task-list-row';
import TaskTableSkeleton from './task-table-skeleton';
import useTaskTableList from '../../hooks/use-task-table-list';

const TaskFormDialog = lazy(() => import('./task-form-dialog'));
const TaskDeleteDialog = lazy(() => import('./task-delete-dialog'));

export default function TaskTableList() {
  const {
    deleteTask,
    editTask,
    isLoading,
    rowVirtualizer,
    parentRef,
    setDeleteTask,
    setEditTask,
    tasks,
  } = useTaskTableList();

  return (
    <>
      <div className="mt-6 h-[500px] overflow-auto" ref={parentRef}>
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]"></TableHead>
                <TableHead className="w-[200px] lg:w-[400px]">Task</TableHead>
                <TableHead className="w-[100px]">Priority</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* show loading skeleton */}
              {isLoading && <TaskTableSkeleton />}
              {/* show empty message when no tasks */}
              {!isLoading && tasks.length === 0 && <TaskEmptyBox />}
              {/* show virtualized tasks */}
              {rowVirtualizer.getVirtualItems().map((virtualRow, index) => {
                const task = tasks[virtualRow.index];
                const rowStyle = {
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${
                    virtualRow.start - index * virtualRow.size
                  }px)`,
                };

                return (
                  <TaskListRow
                    key={task.id}
                    task={task}
                    style={rowStyle}
                    onEdit={() => setEditTask(task)}
                    onDelete={() => setDeleteTask(task)}
                  />
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* edit dialog */}
      <Suspense fallback={null}>
        {editTask && (
          <TaskFormDialog
            task={editTask}
            open={editTask !== null}
            onOpenChange={open => {
              if (!open) setEditTask(null);
            }}
          />
        )}
      </Suspense>

      {/* delete dialog */}
      <Suspense fallback={null}>
        {deleteTask && (
          <TaskDeleteDialog
            task={deleteTask}
            open={deleteTask !== null}
            onOpenChange={open => {
              if (!open) setDeleteTask(null);
            }}
          />
        )}
      </Suspense>
    </>
  );
}
