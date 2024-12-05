import { fireEvent,render, screen, waitFor } from '@testing-library/react';

import { Todo } from '@/types/Todo';

import { TodoItem } from './TodoItem';

const mockTodo: Todo = {
  id: 1,
  text: 'Test Todo',
  completed: false,
  user: '',
};

const mockUsers = ['User1', 'User2'];

describe('TodoItem', () => {
  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={jest.fn()}
        onUpdateText={jest.fn()}
        onUpdateUser={jest.fn()}
        onDeleteTodo={jest.fn()}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onToggleCompleted when checkbox is clicked', () => {
    const mockToggleCompleted = jest.fn();
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={mockToggleCompleted}
        onUpdateText={jest.fn()}
        onUpdateUser={jest.fn()}
        onDeleteTodo={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockToggleCompleted).toHaveBeenCalledWith(mockTodo);
  });

  it('enters edit mode when text is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={jest.fn()}
        onUpdateText={jest.fn()}
        onUpdateUser={jest.fn()}
        onDeleteTodo={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('Test Todo'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('finishes edit when Enter is pressed and updates text', async () => {
    const mockUpdateText = jest.fn();
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={jest.fn()}
        onUpdateText={mockUpdateText}
        onUpdateUser={jest.fn()}
        onDeleteTodo={jest.fn()}
      />
    );

    // Enter edit mode
    fireEvent.click(screen.getByText('Test Todo'));
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();

    // Change the input value
    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    expect(input).toHaveValue('Updated Todo');

    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Test Todo' })).toBeInTheDocument();
    });

    expect(mockUpdateText).toHaveBeenCalledWith(mockTodo, 'Updated Todo');
  });

  it('deletes todo when text is empty', async () => {
    const mockDeleteTodo = jest.fn();
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={jest.fn()}
        onUpdateText={jest.fn()}
        onUpdateUser={jest.fn()}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Test Todo' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('calls onUpdateUser when user is selected', () => {
    const mockUpdateUser = jest.fn();
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={jest.fn()}
        onUpdateText={jest.fn()}
        onUpdateUser={mockUpdateUser}
        onDeleteTodo={jest.fn()}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'User2' } });
    expect(mockUpdateUser).toHaveBeenCalledWith(mockTodo, 'User2');
  });

  it('calls onDeleteTodo when delete button is clicked', async () => {
    const mockDeleteTodo = jest.fn();
    render(
      <TodoItem
        todo={mockTodo}
        users={mockUsers}
        onToggleCompleted={jest.fn()}
        onUpdateText={jest.fn()}
        onUpdateUser={jest.fn()}
        onDeleteTodo={mockDeleteTodo}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo.id);
    });
  });
});
