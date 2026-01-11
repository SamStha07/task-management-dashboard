import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskFilterDrawer } from './task-filter-drawer';
import TaskFilters from './task-filters';
import TaskSearch from './task-search';
import TaskSort from './task-sort';
import TaskFormDialog from './task-form-dialog';

export default function DashboardHeader() {
  return (
    <div className="">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        Tasks Dashboard
      </h1>

      {/* Controls */}
      <div className="mt-4 flex flex-col gap-4">
        {/* Top row: Search and Add Task */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <div className="w-full sm:flex-1">
            <TaskSearch />
          </div>
          <TaskFormDialog
            trigger={
              <Button className="w-full sm:w-fit">
                <Plus className="mr-1 h-4 w-4" />
                Add Task
              </Button>
            }
          />
        </div>

        {/* Desktop: Filters and Sort */}
        <div className="hidden flex-wrap items-center justify-between gap-3 sm:flex">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Status
            </span>
            <TaskFilters />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-right text-sm text-slate-600 dark:text-slate-400">
              Sort
            </span>
            <TaskSort />
          </div>
        </div>

        {/* Mobile: Filter Drawer */}
        <div className="sm:hidden">
          <TaskFilterDrawer />
        </div>
      </div>
    </div>
  );
}
