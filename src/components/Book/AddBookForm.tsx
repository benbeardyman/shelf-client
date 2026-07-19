import { useState } from 'react';
import { api } from '../../api';
import type { BookCreate } from '../../types';
import styles from '../form.module.css';

const empty: BookCreate = {
  title: '',
  author: '',
  year: null,
  genre: null,
  date_read: null,
  rating: null,
  notes: null,
};

export function AddBookForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState<BookCreate>(empty);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof BookCreate, v: string) =>
    setForm((f) => ({ ...f, [k]: v === '' ? null : v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.books.create({
        ...form,
        year: form.year ? Number(form.year) : null,
        rating: form.rating ? Number(form.rating) : null,
      });
      setForm(empty);
      onAdded();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className={styles.entryForm}>
      <input
        required
        placeholder='Title'
        value={form.title}
        onChange={(e) => set('title', e.target.value)}
      />
      <input
        required
        placeholder='Author'
        value={form.author ?? ''}
        onChange={(e) => set('author', e.target.value)}
      />
      <input
        type='number'
        placeholder='Year'
        value={form.year ?? ''}
        onChange={(e) => set('year', e.target.value)}
      />
      <input
        placeholder='Genre'
        value={form.genre ?? ''}
        onChange={(e) => set('genre', e.target.value)}
      />
      <input
        type='date'
        title='Date read'
        value={form.date_read ?? ''}
        onChange={(e) => set('date_read', e.target.value)}
      />
      <select
        value={form.rating ?? ''}
        onChange={(e) => set('rating', e.target.value)}
      >
        <option value=''>Rating</option>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} ★
          </option>
        ))}
      </select>
      <textarea
        placeholder='Notes'
        value={form.notes ?? ''}
        onChange={(e) => set('notes', e.target.value)}
      />
      <button type='submit' disabled={saving}>
        {saving ? 'Saving…' : 'Add Book'}
      </button>
    </form>
  );
}
