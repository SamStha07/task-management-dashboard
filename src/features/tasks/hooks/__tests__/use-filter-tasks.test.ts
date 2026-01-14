import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useFilterTasks from '../use-filter-tasks';
import { useTaskStore } from '../../stores/use-task-store';
import { useTaskFilterStore } from '../../stores/use-task-filter-store';
import type { Task } from '../../libs/types';

const mockData: Task[] = [
  {
    id: '1',
    title: 'Fix bug in login',
    description: 'Login page is not working properly',
    status: 'todo',
    priority: 'high',
    dueDate: '2026-01-20T00:00:00.000Z',
    createdAt: '2026-01-10T10:00:00.000Z',
    updatedAt: '2026-01-10T10:00:00.000Z',
  },
  {
    id: '2',
    title: 'Add new feature',
    description: 'Implement dark mode toggle',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2026-01-25T00:00:00.000Z',
    createdAt: '2026-01-12T10:00:00.000Z',
    updatedAt: '2026-01-12T10:00:00.000Z',
  },
  {
    id: '3',
    title: 'Write documentation',
    description: 'Create API documentation',
    status: 'completed',
    priority: 'low',
    dueDate: '2026-01-15T00:00:00.000Z',
    createdAt: '2026-01-08T10:00:00.000Z',
    updatedAt: '2026-01-08T10:00:00.000Z',
  },
  {
    id: '4',
    title: 'Critical security fix',
    description: 'Fix authentication vulnerability',
    status: 'todo',
    priority: 'critical',
    dueDate: '2026-01-16T00:00:00.000Z',
    createdAt: '2026-01-14T10:00:00.000Z',
    updatedAt: '2026-01-14T10:00:00.000Z',
  },
];

describe('useFilterTasks', () => {
  vi.useFakeTimers();

  beforeEach(() => {
    // Reset stores before each test
    useTaskStore.setState({ tasks: mockData, isLoading: false });
    useTaskFilterStore.setState({
      searchQuery: '',
      status: 'all',
      sort: 'createdAt',
    });
  });

  describe('basic functionality', () => {
    it('should return all tasks when no filters are applied', () => {
      const { result } = renderHook(() => useFilterTasks());
      expect(result.current).toHaveLength(4);
    });

    it('should return tasks sorted by createdAt by default (newest first)', () => {
      const { result } = renderHook(() => useFilterTasks());

      expect(result.current[0].id).toBe('4'); // Most recent - Jan 14
      expect(result.current[1].id).toBe('2'); // Jan 12
      expect(result.current[2].id).toBe('1'); // Jan 10
      expect(result.current[3].id).toBe('3'); // Oldest - Jan 8
    });
  });

  describe('search filtering', () => {
    it('should filter tasks by title', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('bug');
      });

      // Wait for debounce (400ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toBe('Fix bug in login');
    });

    it('should filter tasks by description', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('dark mode');
      });

      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toBe('Add new feature');
    });

    it('should be case insensitive when searching', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('DOCUMENTATION');
      });

      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(result.current).toHaveLength(1);

      expect(result.current[0].title).toBe('Write documentation');
    });

    it('should trim search query before filtering', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('  security  ');
      });
      // Wait for debounce (400ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toBe('Critical security fix');
    });

    it('should return empty array when search query does not match any task', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('nonexistent task');
      });
      // Wait for debounce (400ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });
      expect(result.current).toHaveLength(0);
    });

    it('should debounce search queries', () => {
      const { result } = renderHook(() => useFilterTasks());

      // Change search query multiple times rapidly
      act(() => {
        useTaskFilterStore.getState().setSearchQuery('b');
      });

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('bu');
      });

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('bug');
      });

      // Should not filter immediately
      expect(result.current).toHaveLength(4);

      // Wait for debounce (400ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0].title).toBe('Fix bug in login');
    });
  });

  describe('status filtering', () => {
    it('should filter tasks by todo status', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setStatus('todo');
      });

      expect(result.current).toHaveLength(2);
      expect(result.current.every(task => task.status === 'todo')).toBe(true);
    });

    it('should filter tasks by in-progress status', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setStatus('in-progress');
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0].status).toBe('in-progress');
    });

    it('should filter tasks by completed status', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setStatus('completed');
      });

      expect(result.current).toHaveLength(1);
      expect(result.current[0].status).toBe('completed');
    });

    it('should show all tasks when status is "all"', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setStatus('all');
      });

      expect(result.current).toHaveLength(4);
    });
  });

  describe('sorting', () => {
    it('should sort tasks by createdAt (newest first)', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSort('createdAt');
      });

      expect(result.current[0].id).toBe('4'); // Most recent - Jan 14
      expect(result.current[1].id).toBe('2'); // Jan 12
      expect(result.current[2].id).toBe('1'); // Jan 10
      expect(result.current[3].id).toBe('3'); // Oldest - Jan 8
    });

    it('should sort tasks by dueDate (earliest first)', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSort('dueDate');
      });

      expect(result.current[0].id).toBe('3'); // 2026-01-15
      expect(result.current[1].id).toBe('4'); // 2026-01-16
      expect(result.current[2].id).toBe('1'); // 2026-01-20
      expect(result.current[3].id).toBe('2'); // 2026-01-25
    });

    it('should sort tasks by priority (critical first)', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSort('priority');
      });

      expect(result.current[0].priority).toBe('critical');
      expect(result.current[1].priority).toBe('high');
      expect(result.current[2].priority).toBe('medium');
      expect(result.current[3].priority).toBe('low');
    });
  });

  describe('combined filtering and sorting', () => {
    it('should apply search and status filter together', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('fix');
        useTaskFilterStore.getState().setStatus('todo');
      });

      // Wait for debounce (400ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toHaveLength(2);

      const titles = result.current.map(task => task.title);
      expect(titles).toContain('Fix bug in login');
      expect(titles).toContain('Critical security fix');
    });

    it('should apply all filters and sorting together', () => {
      const { result } = renderHook(() => useFilterTasks());

      act(() => {
        useTaskFilterStore.getState().setSearchQuery('fix');
        useTaskFilterStore.getState().setStatus('todo');
        useTaskFilterStore.getState().setSort('priority');
      });
      // Wait for debounce (400ms)
      act(() => {
        vi.advanceTimersByTime(400);
      });

      expect(result.current).toHaveLength(2);

      // Should be sorted by priority (critical first)
      expect(result.current[0].priority).toBe('critical');
      expect(result.current[1].priority).toBe('high');
    });
  });
});
