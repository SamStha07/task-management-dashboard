import { beforeEach, describe, expect, it } from 'vitest';
import { useTaskFilterStore } from '../use-task-filter-store';

describe('useTaskFilterStore', () => {
  beforeEach(() => {
    useTaskFilterStore.setState({
      status: 'all',
      searchQuery: '',
      sort: 'createdAt',
    });
  });

  it('should initialize with default values', () => {
    const state = useTaskFilterStore.getState();
    expect(state.status).toBe('all');
    expect(state.searchQuery).toBe('');
    expect(state.sort).toBe('createdAt');
  });

  it('should set status correctly', () => {
    useTaskFilterStore.getState().setStatus('todo');
    expect(useTaskFilterStore.getState().status).toBe('todo');
  });

  it('should set search query correctly', () => {
    useTaskFilterStore.getState().setSearchQuery('bug');
    expect(useTaskFilterStore.getState().searchQuery).toBe('bug');
  });

  it('should set sort field correctly', () => {
    useTaskFilterStore.getState().setSort('priority');
    expect(useTaskFilterStore.getState().sort).toBe('priority');
  });
});
