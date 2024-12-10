import { renderHook, act, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

import * as api from '@/services/api';
import { ToastProvider } from '@/context/ToastContext';
import { useTodos } from './useTodos';

// Mock the API module
jest.mock('@/services/api');

const wrapper = ({ children }: { children: ReactNode }) => (
  <ToastProvider>{children}</ToastProvider>
);

describe('useTodos', () => {
  it('fetches todos on mount', async () => {
    const mockTodos = [{ id: 1, text: 'Test Todo', completed: false, user: '' }];
    (api.fetchTodosAPI as jest.Mock).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodos({ selectedUser: '', filter: '' }), { wrapper });

    act(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.todos).toEqual(mockTodos);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('adds a new todo', async () => {
    const mockTodoId = 1;
    (api.createTodoAPI as jest.Mock).mockResolvedValue(mockTodoId);
    (api.fetchTodosAPI as jest.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useTodos({ selectedUser: '', filter: '' }), { wrapper });

    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addTodo('New Todo');
    });

    expect(api.createTodoAPI).toHaveBeenCalledWith('New Todo');
    expect(result.current.todos).toEqual([
      expect.objectContaining({
        id: mockTodoId,
        text: 'New Todo',
        completed: false,
        user: '',
      }),
    ]);
  });

  it('updates a todo', async () => {
    const initialTodos = [{ id: 1, text: 'Test Todo', completed: false, user: '' }];
    (api.fetchTodosAPI as jest.Mock).mockResolvedValue(initialTodos);
    (api.updateTodoAPI as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos({ selectedUser: '', filter: '' }), { wrapper });

    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.todos).toEqual(initialTodos));

    const updates = { completed: true };
    await act(async () => {
      await result.current.updateTodo(1, updates);
    });

    expect(api.updateTodoAPI).toHaveBeenCalledWith(1, updates);
    expect(result.current.todos[0].completed).toBe(true);
  });

  it('deletes a todo', async () => {
    const initialTodos = [{ id: 1, text: 'Test Todo', completed: false, user: '' }];
    (api.fetchTodosAPI as jest.Mock).mockResolvedValue(initialTodos);
    (api.deleteTodoAPI as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useTodos({ selectedUser: '', filter: '' }), { wrapper });

    // Wait for initial loading to complete
    await waitFor(() => expect(result.current.todos).toEqual(initialTodos));

    await act(async () => {
      await result.current.deleteTodo(1);
    });

    expect(api.deleteTodoAPI).toHaveBeenCalledWith(1);
    expect(result.current.todos).toEqual([]);
  });
});