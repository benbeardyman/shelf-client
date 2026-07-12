export interface Book {
  id: number;
  title: string;
  author: string;
  year: number | null;
  genre: string | null;
  date_read: string | null;
  rating: number | null;
  notes: string | null;
}

export interface Film {
  id: number;
  title: string;
  director: string | null;
  year: number | null;
  genre: string | null;
  date_watched: string | null;
  rating: number | null;
  notes: string | null;
}

export type BookCreate = Omit<Book, 'id'>;
export type FilmCreate = Omit<Film, 'id'>;
