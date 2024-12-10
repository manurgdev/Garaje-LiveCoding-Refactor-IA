import { Todo } from '@/types/Todo';
import { TodoClient } from './TodoClient';

const todoClient = new TodoClient();

export const fetchTodosAPI = (user: string, filter: string): Promise<Todo[]> => {
  return todoClient.fetchTodos(user, filter);
};

export const createTodoAPI = (text: string): Promise<void> => {
  return todoClient.createTodo(text);
};

export const updateTodoAPI = (todoId: number, updates: Partial<Todo>): Promise<void> => {
  return todoClient.updateTodo(todoId, updates);
};

export const deleteTodoAPI = (id: number): Promise<void> => {
  return todoClient.deleteTodo(id);
}; 