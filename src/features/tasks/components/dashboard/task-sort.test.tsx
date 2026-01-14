import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useTaskFilterStore } from '../../stores/use-task-filter-store';
import TaskSort from './task-sort';

describe('TastSort', () => {
  beforeEach(() => {
    useTaskFilterStore.setState({ sort: 'createdAt' });
    render(<TaskSort />);
  });

  it('should render select with initial value', () => {
    const trigger = screen.getByText('Created Date'); // initial value
    expect(trigger).toBeInTheDocument();
  });

  it('should update store when setSort is called', () => {
    useTaskFilterStore.getState().setSort('priority');
    expect(useTaskFilterStore.getState().sort).toBe('priority');
  });
});
