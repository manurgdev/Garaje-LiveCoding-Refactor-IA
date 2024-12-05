import { fireEvent,render, screen } from '@testing-library/react';
import React from 'react';

import { UserFilter } from './UserFilter';

describe('UserFilter', () => {
  const mockUsers = ['Alice', 'Bob', 'Charlie'];
  const mockOnUserChange = jest.fn();

  beforeEach(() => {
    mockOnUserChange.mockClear();
  });

  it('renders correctly with default selected user', () => {
    render(<UserFilter users={mockUsers} selectedUser="" onUserChange={mockOnUserChange} />);

    expect(screen.getByLabelText('Usuario')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByText('Todos')).toBeInTheDocument();
    mockUsers.forEach(user => {
      expect(screen.getByText(user)).toBeInTheDocument();
    });
  });

  it('renders correctly with a selected user', () => {
    render(<UserFilter users={mockUsers} selectedUser="Bob" onUserChange={mockOnUserChange} />);

    expect(screen.getByRole('combobox')).toHaveValue('Bob');
  });

  it('calls onUserChange when selection changes', () => {
    render(<UserFilter users={mockUsers} selectedUser="" onUserChange={mockOnUserChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Alice' } });

    expect(mockOnUserChange).toHaveBeenCalledWith('Alice');
  });

  it('applies correct styles', () => {
    render(<UserFilter users={mockUsers} selectedUser="" onUserChange={mockOnUserChange} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('w-full sm:w-40 bg-white text-sm rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800');
  });

  it('renders all users in the dropdown', () => {
    render(<UserFilter users={mockUsers} selectedUser="" onUserChange={mockOnUserChange} />);

    mockUsers.forEach(user => {
      expect(screen.getByText(user)).toBeInTheDocument();
    });
  });

  it('selects "Todos" option when no user is selected', () => {
    render(<UserFilter users={mockUsers} selectedUser="" onUserChange={mockOnUserChange} />);

    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByText('Todos')).toBeInTheDocument();
  });
});