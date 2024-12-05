'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { StatusFilter } from '@/components/filter/StatusFilter';
import { UserFilter } from '@/components/filter/UserFilter';
import { TodoInput } from '@/components/todo/TodoInput';
import { TodoItem } from '@/components/todo/TodoItem';
import { Todo } from '@/types/Todo';

export const TodoListWithLogic: FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users] = useState<string[]>(['Manu', 'Cris', 'Bob']);
  const [selectedUser, setSelectedUser] = useState('');
  const [filter, setFilter] = useState('');

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

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTodo, user: '' }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { status } = await response.json();
      if (status) {
        setNewTodo('');
        fetchTodos();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleCompleted = async (todo: Todo) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
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
  };

  const updateText = async (todo: Todo, newText: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText }),
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
  };

  const updateUser = async (todo: Todo, user: string) => {
    if (user === todo.user) return;
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user }),
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
  };

  const deleteTodo = async (id: number) => {
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
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Lista de tareas (React + TypeScript)
        </h1>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <UserFilter
              users={users}
              selectedUser={selectedUser}
              onUserChange={setSelectedUser}
            />
            <StatusFilter filter={filter} onFilterChange={setFilter} />
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <TodoInput
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
          />
        </div>

        <div className="space-y-3 mt-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              users={users}
              onToggleCompleted={toggleCompleted}
              onUpdateText={updateText}
              onUpdateUser={updateUser}
              onDeleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};