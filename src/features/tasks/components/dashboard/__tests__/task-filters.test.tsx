import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import TaskFilters from '../task-filters';
import { useTaskFilterStore } from '../../../stores/use-task-filter-store';

describe('TaskFilter', () => {
  beforeEach(() => {
    useTaskFilterStore.setState({ status: 'all' });
    render(<TaskFilters />);
  });

  it('should render all filter options', () => {
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('should highlight the selected filter button', () => {
    const allbutton = screen.getByText('All');
    expect(allbutton).toHaveAttribute('data-variant', 'default');
  });

  it('should update the store when click on button', async () => {
    const button = screen.getByText('In Progress');
    await userEvent.click(button);
    expect(useTaskFilterStore.getState().status).toBe('in-progress');
  });
});
