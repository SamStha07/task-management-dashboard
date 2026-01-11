export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type SortField = 'dueDate' | 'priority' | 'createdAt';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date; // ISO 8601 format
  createdAt: string;
  updatedAt: string;
  tags?: string[];
}
