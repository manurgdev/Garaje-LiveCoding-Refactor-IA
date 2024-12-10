'use client';

import React, { FC, useState } from 'react';

import { StatusFilter } from '@/components/filter/StatusFilter';
import { UserFilter } from '@/components/filter/UserFilter';
import { TodoInput } from '@/components/todo/TodoInput';
import { TodoItem } from '@/components/todo/TodoItem';
import { TodoList } from '@/components/todo/TodoList';
import { useTodos } from '@/hooks/useTodos';
import { Todo } from '@/types/Todo';
import { TodoListSkeleton } from '@/components/skeleton/TodoSkeleton';

export const TodoListScene: FC = () => {
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
    <TodoList 
      title="Lista de tareas"
      userFilter={<UserFilter
        users={users}
        selectedUser={selectedUser}
        onUserChange={setSelectedUser}
      />}
      statusFilter={<StatusFilter filter={filter} onFilterChange={setFilter} />}
      todoInput={<TodoInput newTodo={newTodo} setNewTodo={setNewTodo} addTodo={handleAddTodo} />}
    >
      {isLoading ? (
        <TodoListSkeleton />
      ) : (
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
      )}
    </TodoList>
  );
};