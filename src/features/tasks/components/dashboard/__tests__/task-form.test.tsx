import { beforeEach, expect, it } from 'vitest';
import { describe, vi } from 'vitest';
import TaskForm from '../task-form';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TaskForm', () => {
  const onSubmit = vi.fn();
  const onCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<TaskForm onSubmit={onSubmit} onCancel={onCancel} />);
  });

  it('should render all fields', () => {
    expect(screen.getByPlaceholderText('Enter task title')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter task description')
    ).toBeInTheDocument();
    expect(screen.getByText('Select status')).toBeInTheDocument();
    expect(screen.getByText('Select priority')).toBeInTheDocument();
    expect(screen.getByText('Select date')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Type a tag and press Enter...')
    ).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Create Task')).toBeInTheDocument();
  });

  it('should call onCancel when cancel button is clicked', async () => {
    await userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
});
