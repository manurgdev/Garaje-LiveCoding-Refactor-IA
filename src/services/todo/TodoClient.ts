import { HttpClient } from '../http/HttpClient';
import { Todo } from '@/types/Todo';
import { API_CONFIG } from '@/config/api';

export class TodoClient {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(API_CONFIG.TODO_API_URL);
  }

  async fetchTodos(user: string, filter: string): Promise<Todo[]> {
    return this.httpClient.get('', { user, filter });
  }

  async createTodo(text: string): Promise<void> {
    return this.httpClient.post('', { text, user: '' });
  }

  async updateTodo(todoId: number, updates: Partial<Todo>): Promise<void> {
    return this.httpClient.patch(`/${todoId}`, updates);
  }

  async deleteTodo(id: number): Promise<void> {
    return this.httpClient.delete(`/${id}`);
  }
} 