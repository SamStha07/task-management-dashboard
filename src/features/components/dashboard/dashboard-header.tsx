import TaskFilters from './task-filters';
import TaskSearch from './task-search';
import TaskSort from './task-sort';

export default function DashboardHeader() {
  return (
    <div className="px-4 py-6 sm:py-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        Tasks
      </h1>

      {/* Controls */}
      <div className="my-6 flex flex-col gap-4">
        {/* Top row: Search and Add Task */}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <TaskSearch />
          </div>
        </div>

        {/* Bottom row: Filters and Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Status:
            </span>
            <TaskFilters />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Sort:
            </span>
            <TaskSort />
          </div>
        </div>
      </div>
    </div>
  );
}
