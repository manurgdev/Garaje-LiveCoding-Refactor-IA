import { FC, useEffect, useRef, useState } from 'react';

import { Todo } from '@/types/Todo';

type TodoItemProps = {
  todo: Todo;
  users: string[];
  onToggleCompleted: (todo: Todo) => void;
  onUpdateText: (todo: Todo, newText: string) => void;
  onUpdateUser: (todo: Todo, user: string) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  users,
  onToggleCompleted,
  onUpdateText,
  onUpdateUser,
  onDeleteTodo,
}) => {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const editInputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setEditing(true);
  };

  const finishEdit = () => {
    setEditing(false);
    if (editText.trim() === '') {
      onDeleteTodo(todo.id);
      return;
    }
    if (editText !== todo.text) {
      onUpdateText(todo, editText);
    }
  };

  useEffect(() => {
    if (editing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editing]);

  return (
    <div
      className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
    >
      <div className="flex items-center flex-grow mr-4 mb-2 sm:mb-0">
        <input
          type="checkbox"
          onChange={() => onToggleCompleted(todo)}
          checked={todo.completed}
          className="mr-3 h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
        />
        <div className="flex-grow">
          {editing ? (
            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={finishEdit}
              onKeyUp={(e) => e.key === 'Enter' && finishEdit()}
              className="w-full bg-transparent focus:outline-none text-gray-800"
              ref={editInputRef}
            />
          ) : (
            <button
              onClick={startEdit}
              className={`cursor-text ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.text}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
        <select
          onChange={(e) => onUpdateUser(todo, e.target.value)}
          value={todo.user}
          className="w-32 bg-gray-100 text-sm rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        >
          <option value="">Sin asignar</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
        <button
          onClick={() => onDeleteTodo(todo.id)}
          className="ml-4 text-gray-400 hover:text-red-500 focus:outline-none"
          aria-label="Delete"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};