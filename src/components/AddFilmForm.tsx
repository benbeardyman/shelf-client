import { useState } from 'react';
import { api } from '../api';
import type { FilmCreate } from '../types';
import styles from './form.module.css';

const empty: FilmCreate = {
  title: '',
  director: null,
  year: null,
  genre: null,
  date_watched: null,
  rating: null,
  type: '',
  notes: null,
};

export function AddFilmForm({ onAdded }: { onAdded: () => void }) {
  const [form, setForm] = useState<FilmCreate>(empty);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof FilmCreate, v: string) =>
    setForm((f) => ({ ...f, [k]: v === '' ? null : v }));

  const submit = async (e: React.FormEvent) => {
    console.log('form', form);
    e.preventDefault();
    setSaving(true);
    try {
      await api.films.create({
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
        placeholder='Director'
        value={form.director ?? ''}
        onChange={(e) => set('director', e.target.value)}
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
        title='Date watched'
        value={form.date_watched ?? ''}
        onChange={(e) => set('date_watched', e.target.value)}
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
      <div className={styles.radioGroup}>
        {['Film', 'TV'].map((option) => (
          <div key={option} className={styles.radioOption}>
            <input
              type='radio'
              id={`type-${option}`}
              name='type'
              value={option}
              checked={form.type === option}
              onChange={(e) => set('type', e.target.value)}
            />
            <label htmlFor={`type-${option}`}>{option}</label>
          </div>
        ))}
      </div>
      <textarea
        placeholder='Notes'
        value={form.notes ?? ''}
        onChange={(e) => set('notes', e.target.value)}
      />
      <button type='submit' disabled={saving}>
        {saving ? 'Saving…' : 'Add Film'}
      </button>
    </form>
  );
}
