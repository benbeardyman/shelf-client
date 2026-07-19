import { useEffect, useState } from 'react';
import { api } from '../../api';
import type { FilmCreate } from '../../types';
import styles from '../form.module.css';

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

export function FilmForm({
  filmId = null,
  onAdded,
  onDeleted,
}: {
  filmId?: string | null;
  onAdded: () => void;
  onDeleted?: () => void;
}) {
  const [form, setForm] = useState<FilmCreate>(empty);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!filmId) {
      setForm(empty);
      return;
    }

    const loadFilm = async () => {
      const films = await api.films.list();
      const film = films.find((f) => f.id === Number(filmId));
      if (film) {
        setForm({
          title: film.title,
          director: film.director,
          year: film.year,
          genre: film.genre,
          date_watched: film.date_watched,
          rating: film.rating,
          type: film.type,
          notes: film.notes,
        });
      }
    };

    loadFilm();
  }, [filmId]);

  const set = (k: keyof FilmCreate, v: string) =>
    setForm((f) => ({ ...f, [k]: v === '' ? null : v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = {
        ...form,
        year: form.year ? Number(form.year) : null,
        rating: form.rating ? Number(form.rating) : null,
      };

      if (filmId) {
        await api.films.update(Number(filmId), data);
      } else {
        await api.films.create(data);
      }

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
              required
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
        {saving ? 'Saving…' : filmId ? 'Update Film' : 'Add Film'}
      </button>
      {filmId && (
        <button
          className={styles.deleteBtn}
          onClick={async () => {
            await api.films.remove(Number(filmId));
            onDeleted?.();
          }}
          aria-label='Delete'
        >
          Delete Film
        </button>
      )}
    </form>
  );
}
