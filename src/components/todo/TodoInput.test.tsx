import { fireEvent,render, screen } from '@testing-library/react';

import { TodoInput } from './TodoInput';

describe('TodoInput', () => {
  it('renders input and button', () => {
    render(<TodoInput newTodo="" setNewTodo={jest.fn()} addTodo={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Añadir nueva tarea...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument();
  });

  it('calls setNewTodo when input changes', () => {
    const mockSetNewTodo = jest.fn();
    render(<TodoInput newTodo="" setNewTodo={mockSetNewTodo} addTodo={jest.fn()} />);
    
    fireEvent.change(screen.getByPlaceholderText('Añadir nueva tarea...'), { target: { value: 'New Todo' } });
    expect(mockSetNewTodo).toHaveBeenCalledWith('New Todo');
  });

  it('calls addTodo when button is clicked', () => {
    const mockAddTodo = jest.fn();
    render(<TodoInput newTodo="New Todo" setNewTodo={jest.fn()} addTodo={mockAddTodo} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Añadir' }));
    expect(mockAddTodo).toHaveBeenCalled();
  });

  it('calls addTodo when Enter key is pressed', () => {
    const mockAddTodo = jest.fn();
    render(<TodoInput newTodo="New Todo" setNewTodo={jest.fn()} addTodo={mockAddTodo} />);
    
    fireEvent.keyUp(screen.getByPlaceholderText('Añadir nueva tarea...'), { key: 'Enter', code: 'Enter' });
    expect(mockAddTodo).toHaveBeenCalled();
  });
});