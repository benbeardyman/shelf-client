import type { Book, BookCreate, Film, FilmCreate } from './types';

const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  books: {
    list: () => request<Book[]>('/books/'),
    create: (data: BookCreate) =>
      request<Book>('/books/', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<BookCreate>) =>
      request<Book>(`/books/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    remove: (id: number) => request<void>(`/books/${id}`, { method: 'DELETE' }),
  },
  films: {
    list: () => request<Film[]>('/films/'),
    create: (data: FilmCreate) =>
      request<Film>('/films/', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Partial<FilmCreate>) =>
      request<Film>(`/films/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    remove: (id: number) => request<void>(`/films/${id}`, { method: 'DELETE' }),
  },
};
