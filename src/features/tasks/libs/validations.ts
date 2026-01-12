import { z } from 'zod';

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  status: z.enum(['todo', 'in-progress', 'completed'], {
    message: 'Status is required',
  }),
  priority: z.enum(['low', 'medium', 'high', 'critical'], {
    message: 'Priority is required',
  }),
  dueDate: z.date({
    error: 'Please select a date',
  }),
  tags: z.array(z.string()).optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;
