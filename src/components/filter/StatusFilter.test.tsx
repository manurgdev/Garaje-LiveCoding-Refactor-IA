import { fireEvent,render, screen } from '@testing-library/react';
import React from 'react';

import { StatusFilter } from './StatusFilter';

describe('StatusFilter', () => {
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  it('renders correctly with default filter', () => {
    render(<StatusFilter filter="" onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByText('Todas')).toBeInTheDocument();
    expect(screen.getByText('Completadas')).toBeInTheDocument();
    expect(screen.getByText('Incompletas')).toBeInTheDocument();
  });

  it('renders correctly with completed filter', () => {
    render(<StatusFilter filter="completed" onFilterChange={mockOnFilterChange} />);

    expect(screen.getByRole('combobox')).toHaveValue('completed');
  });

  it('renders correctly with incomplete filter', () => {
    render(<StatusFilter filter="incomplete" onFilterChange={mockOnFilterChange} />);

    expect(screen.getByRole('combobox')).toHaveValue('incomplete');
  });

  it('calls onFilterChange when selection changes', () => {
    render(<StatusFilter filter="" onFilterChange={mockOnFilterChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'completed' } });

    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });

  it('applies correct styles', () => {
    render(<StatusFilter filter="" onFilterChange={mockOnFilterChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800');
  });
});