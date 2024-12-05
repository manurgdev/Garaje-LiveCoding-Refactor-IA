import { Todo } from '@/types/Todo';

const API_URL = 'http://localhost:3000/todos';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (!data.status) {
    throw new Error('API responded with an error');
  }
  return data.data;
};

export const fetchTodosAPI = async (user: string, filter: string): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}?user=${user}&filter=${filter}`);
  return handleResponse(response);
};

export const createTodoAPI = async (text: string): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, user: '' }),
  });
  await handleResponse(response);
};

export const updateTodoAPI = async (todoId: number, updates: Partial<Todo>): Promise<void> => {
  const response = await fetch(`${API_URL}/${todoId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  await handleResponse(response);
};

export const deleteTodoAPI = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(response);
};
