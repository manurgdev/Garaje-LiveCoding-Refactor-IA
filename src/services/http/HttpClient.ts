export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (!data.status) {
      throw new Error('API responded with an error');
    }
    return data.data;
  }

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetch(`${this.baseUrl}${path}${queryString}`);
    return this.handleResponse(response);
  }

  async post<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  async patch<T>(path: string, body: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  async delete<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'DELETE',
    });
    return this.handleResponse(response);
  }
} 