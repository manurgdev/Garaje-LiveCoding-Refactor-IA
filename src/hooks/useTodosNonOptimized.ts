import { useCallback,useEffect, useState } from 'react';

import { Todo } from '@/types/Todo';

interface UseTodosProps {
  selectedUser: string;
  filter: string;
}

export function useTodos({ selectedUser, filter }: UseTodosProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos?user=${selectedUser}&filter=${filter}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status, data } = await response.json();
      setTodos(status ? data : []);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [selectedUser, filter]);

  const addTodo = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, user: '' }),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { status } = await response.json();
        if (status) {
          fetchTodos();
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    [fetchTodos]
  );

  const updateTodo = useCallback(
    async (todoId: number, updates: Partial<Todo>) => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { status } = await response.json();
        if (status) {
          fetchTodos();
        }
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    [fetchTodos]
  );

  const deleteTodo = useCallback(
    async (id: number) => {
      try {
        const response = await fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { status } = await response.json();
        if (status) {
          fetchTodos();
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    [fetchTodos]
  );

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
}
