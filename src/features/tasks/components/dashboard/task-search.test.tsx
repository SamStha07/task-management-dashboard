import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import TaskSearch from './task-search';
import { useTaskFilterStore } from '../../stores/use-task-filter-store';

describe('TaskSearch', () => {
  beforeEach(() => {
    useTaskFilterStore.setState({ searchQuery: '' });
    render(<TaskSearch />);
  });

  it('should display search input field', async () => {
    const input = screen.getByPlaceholderText('Search tasks...');
    expect(input).toBeInTheDocument();
  });

  it('should display clear button when there is text in input', async () => {
    const input = screen.getByPlaceholderText('Search tasks...');
    await userEvent.type(input, 'bug');
    // Check input value
    expect(input).toHaveValue('bug');
    // Check Zustand store
    expect(useTaskFilterStore.getState().searchQuery).toBe('bug');
    // Clear button appears
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
    // Click clear button
    await userEvent.click(clearButton);
    // Check input value
    expect(input).toHaveValue('');
    // Check Zustand store
    expect(useTaskFilterStore.getState().searchQuery).toBe('');
  });

  it('should clear button disappears when input is empty', async () => {
    const input = screen.getByPlaceholderText('Search tasks...');
    // Initially no clear button
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    // Type something
    await userEvent.type(input, 'bug');
    // Clear button appears
    expect(screen.getByRole('button')).toBeInTheDocument();
    // Clear the input
    await userEvent.clear(input);
    // Clear button disappears
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
