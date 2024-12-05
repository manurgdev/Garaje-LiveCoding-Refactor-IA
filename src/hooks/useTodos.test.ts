import { act,renderHook, RenderHookResult, waitFor } from '@testing-library/react';

import * as api from '@/services/api';

import { useTodos } from './useTodos';

jest.mock('@/services/api');

describe('useTodos', () => {
  it('fetches todos on mount', async () => {
    const mockTodos = [{ id: 1, text: 'Test Todo', completed: false, user: '' }];
    (api.fetchTodosAPI as jest.Mock).mockResolvedValue(mockTodos);

    const { result } = renderHook(() => useTodos({ selectedUser: '', filter: '' }));

    act(() => {
      expect(result.current.isLoading).toBe(true);
    });

    await waitFor(() => {
      expect(result.current.todos).toEqual(mockTodos);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('adds a new todo', async () => {
    (api.createTodoAPI as jest.Mock).mockResolvedValue(undefined);
    (api.fetchTodosAPI as jest.Mock).mockResolvedValue([]);

    let hookRendered: RenderHookResult<ReturnType<typeof useTodos>, unknown>;

    await act(async () => {
      const rendered = renderHook(() => useTodos({ selectedUser: '', filter: '' }));
      hookRendered = rendered;
      
      // Wait for the initial fetch to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Wait for loading to finish
    await waitFor(() => expect(hookRendered.result.current.isLoading).toBe(false));

    expect(api.fetchTodosAPI).toHaveBeenCalledTimes(2);

    await act(async () => {
      hookRendered.result.current.addTodo('New Todo');
      // Wait for the addTodo operation to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // Wait for loading to finish again
    await waitFor(() => expect(hookRendered.result.current.isLoading).toBe(false));

    expect(api.createTodoAPI).toHaveBeenCalledWith('New Todo');
    expect(api.fetchTodosAPI).toHaveBeenCalledTimes(3);
  });
});