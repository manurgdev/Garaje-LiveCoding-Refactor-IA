'use client';

import React, { FC, useState } from 'react';

import { StatusFilter } from '@/components/filter/StatusFilter';
import { UserFilter } from '@/components/filter/UserFilter';
import { TodoInput } from '@/components/todo/TodoInput';
import { TodoItem } from '@/components/todo/TodoItem';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/Todo';

export const TodoListWithHandling: FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [users] = useState<string[]>(['Manu', 'Cris', 'Bob']);
  const [selectedUser, setSelectedUser] = useState('');
  const [filter, setFilter] = useState('');

  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo } = useTodos({
    selectedUser,
    filter,
  });

  const handleAddTodo = async () => {
    await addTodo(newTodo);
    setNewTodo('');
  };

  const toggleCompleted = (todo: Todo) => {
    updateTodo(todo.id, { completed: !todo.completed });
  };

  const updateText = (todo: Todo, newText: string) => {
    updateTodo(todo.id, { text: newText });
  };

  const updateUser = (todo: Todo, user: string) => {
    if (user !== todo.user) {
      updateTodo(todo.id, { user });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Lista de tareas (React + TypeScript + Hook + Handling)
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
          <TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={handleAddTodo} />
        </div>

        {isLoading && <p className="text-blue-500 mt-4">Cargando...</p>}
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}

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