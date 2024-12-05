import { FC, memo } from 'react';

type TodoInputProps = {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
}

const TodoInputComponent: FC<TodoInputProps> = ({ newTodo, setNewTodo, addTodo }) => {
  return (
    <>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Añadir nueva tarea..."
        className="w-4/6 md:w-5/6 p-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
      />
      <button
        onClick={addTodo}
        className="w-2/6 md:w-1/6 p-2.5 md:p-2 rounded-lg text-sm md:text-base bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Añadir
      </button>
    </>
  );
};

export const TodoInput = memo(TodoInputComponent);