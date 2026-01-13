import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Task } from '@/features/tasks/libs/types';
import type { TaskFormData } from '@/features/tasks/libs/validations';
import { useTaskStore } from '@/features/tasks/stores/use-task-store';
import TaskForm from './task-form';

interface TaskFormDialogProps {
  task?: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TaskFormDialog({
  task,
  open,
  onOpenChange,
}: TaskFormDialogProps) {
  const addTask = useTaskStore(state => state.addTask);
  const updateTask = useTaskStore(state => state.updateTask);

  const handleSubmit = (data: TaskFormData) => {
    if (task) {
      updateTask({
        id: task.id,
        ...data,
      });
      toast.success('Task updated successfully');
    } else {
      addTask(data);
      toast.success('Task added successfully');
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl space-y-4">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {task
              ? 'Update the details of your task below.'
              : 'Fill in the details to create a new task.'}
          </DialogDescription>
        </DialogHeader>
        <TaskForm task={task} onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
