import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useToogle from '@/hooks/use-toogle';
import type { Task } from '@/features/tasks/libs/types';
import type { TaskFormData } from '@/features/tasks/libs/validations';
import { useTaskStore } from '@/features/tasks/stores/use-task-store';
import TaskForm from './task-form';

interface TaskFormDialogProps {
  task?: Task;
  trigger?: React.ReactNode;
}

export default function TaskFormDialog({ task, trigger }: TaskFormDialogProps) {
  const { open, setOpen } = useToogle();
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);

  const handleSubmit = (data: TaskFormData) => {
    if (task) {
      updateTask({
        id: task.id,
        ...data,
      });
    } else {
      addTask(data);
    }
    setOpen(false);
  };

  const defaultTrigger = (
    <Button>
      <Plus className="mr-1 h-4 w-4" />
      Add Task
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {task
              ? 'Update the details of your task below.'
              : 'Fill in the details to create a new task.'}
          </DialogDescription>
        </DialogHeader>
        <TaskForm
          task={task}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
