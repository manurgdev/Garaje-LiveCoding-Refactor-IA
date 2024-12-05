import { useCallback, useEffect, useState } from 'react';

import {
  createTodoAPI,
  deleteTodoAPI,
  fetchTodosAPI,
  updateTodoAPI,
} from '@/services/api';
import { Todo } from '@/types/Todo';

interface UseTodosProps {
  selectedUser: string;
  filter: string;
}

export function useTodos({ selectedUser, filter }: UseTodosProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTodosAPI(selectedUser, filter);
      setTodos(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [selectedUser, filter]);

  const addTodo = useCallback(
    async (text: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await createTodoAPI(text);
        await fetchTodos();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchTodos]
  );

  const updateTodo = useCallback(
    async (todoId: number, updates: Partial<Todo>) => {
      setIsLoading(true);
      setError(null);
      try {
        await updateTodoAPI(todoId, updates);
        await fetchTodos();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchTodos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      setIsLoading(true);
      setError(null);
      try {
        await deleteTodoAPI(id);
        await fetchTodos();
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchTodos]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
