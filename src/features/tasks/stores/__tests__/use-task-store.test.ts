import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useTaskStore } from '../use-task-store';

// You can mock global variables that are not present with jsdom or node by using vi.stubGlobal helper. It will put the value of the global variable into a globalThis object.
vi.stubGlobal('crypto', {
  randomUUID: () => 'test-uuid',
});

describe('useTaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [],
    });
  });

  it('should add a new task', () => {
    useTaskStore.getState().addTask({
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo',
      priority: 'high',
      dueDate: '2026-01-20T00:00:00.000Z',
    });

    const tasks = useTaskStore.getState().tasks;

    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe('test-uuid');
    expect(tasks[0].title).toBe('Test Task');
  });

  it('should update a task', () => {
    useTaskStore.setState({
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: 'todo',
          priority: 'high',
          dueDate: '2026-01-20T00:00:00.000Z',
          createdAt: '2026-01-15T00:00:00.000Z',
          updatedAt: "2026-01-15T00:00:00.000Z'",
        },
      ],
    });

    useTaskStore.getState().updateTask({
      id: '1',
      title: 'Updated Task',
    });

    const task = useTaskStore.getState().tasks[0];
    expect(task.title).toBe('Updated Task');
  });

  it('should delete a task', () => {
    useTaskStore.setState({
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: 'todo',
          priority: 'high',
          dueDate: '2026-01-20T00:00:00.000Z',
          createdAt: '2026-01-15T00:00:00.000Z',
          updatedAt: "2026-01-15T00:00:00.000Z'",
        },
      ],
    });

    useTaskStore.getState().deleteTask('1');

    const task = useTaskStore.getState().tasks;
    expect(task.length).toBe(0);
  });

  it('should mark task as completed', () => {
    useTaskStore.setState({
      tasks: [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: 'todo',
          priority: 'high',
          dueDate: '2026-01-20T00:00:00.000Z',
          createdAt: '2026-01-15T00:00:00.000Z',
          updatedAt: "2026-01-15T00:00:00.000Z'",
        },
      ],
    });

    // will mark task as completed
    useTaskStore.getState().markTaskAsCompleted('1');
    // check if the status is completed
    expect(useTaskStore.getState().tasks[0].status).toBe('completed');

    // will mark task as todo if task is already completed
    useTaskStore.getState().markTaskAsCompleted('1');
    expect(useTaskStore.getState().tasks[0].status).toBe('todo');
  });
});
