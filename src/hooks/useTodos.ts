import { useCallback, useEffect, useState } from 'react';

import {
  createTodoAPI,
  deleteTodoAPI,
  fetchTodosAPI,
  updateTodoAPI,
} from '@/services/api';
import { Todo } from '@/types/Todo';
import { useToast } from '@/context/ToastContext';

interface UseTodosProps {
  selectedUser: string;
  filter: string;
}

export function useTodos({ selectedUser, filter }: UseTodosProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTodosAPI(selectedUser, filter);
      setTodos(data);
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedUser, filter, showToast]);

  const addTodo = useCallback(async (text: string) => {
    setError(null);
    try {
      const newTodoId = await createTodoAPI(text);
      const newTodo: Todo = {
        id: newTodoId,
        text,
        completed: false,
        user: '',
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      showToast('Tarea creada correctamente', 'success');
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    }
  }, [showToast]);

  const updateTodo = useCallback(async (todoId: number, updates: Partial<Todo>) => {
    setError(null);
    try {
      await updateTodoAPI(todoId, updates);
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === todoId ? { ...todo, ...updates } : todo
        )
      );
      showToast('Tarea actualizada correctamente', 'success');
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    }
  }, [showToast]);

  const deleteTodo = useCallback(async (id: number) => {
    setError(null);
    try {
      await deleteTodoAPI(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      showToast('Tarea eliminada correctamente', 'success');
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    }
  }, [showToast]);

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
