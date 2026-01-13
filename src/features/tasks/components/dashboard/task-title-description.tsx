import type { Task } from '../../libs/types';

export default function TaskTitleDescription({ task }: { task: Task }) {
  return (
    <>
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
    </>
  );
}
