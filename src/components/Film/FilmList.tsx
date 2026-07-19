import { useState } from 'react';
import type { Film } from '../../types';
import styles from '../item.module.css';
import { FilmForm } from './FilmForm';

function Stars({ n }: { n: number | null }) {
  if (!n) return null;
  return (
    <span className={styles.stars}>
      {'★'.repeat(n)}
      {'☆'.repeat(5 - n)}
    </span>
  );
}

export function FilmList({
  films,
  onChanged,
}: {
  films: Film[];
  onChanged: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null);

  if (!films.length) return <p className={styles.empty}>No films yet.</p>;

  const handleFormChange = () => {
    setShowForm(false);
    setSelectedFilmId(null);
    onChanged();
  };

  return (
    <div>
      <ul className={styles.itemList}>
        {films.map((f) => (
          <li key={f.id} className={styles.itemCard}>
            <div className={styles.itemMain}>
              <strong>{f.title}</strong>
              <span className={styles.itemSub}>
                {`${f.type} `}
                {f.director ? `Dir. ${f.director}` : ''}
                {f.year ? ` (${f.year})` : ''}
              </span>
              {f.genre && <span className={styles.tag}>{f.genre}</span>}
            </div>
            <div className={styles.itemMeta}>
              <Stars n={f.rating} />
              {f.date_watched && (
                <span className={styles.date}>Watched {f.date_watched}</span>
              )}
            </div>
            {f.notes && <p className={styles.notes}>{f.notes}</p>}
            <button
              className={styles.editBtn}
              onClick={() => {
                setSelectedFilmId(String(f.id));
                setShowForm((v) => !v);
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      {showForm && (
        <>
          <div className={styles.modalBackdrop} onClick={handleFormChange} />
          <section className={styles.modalFormSection}>
            <FilmForm
              filmId={selectedFilmId}
              onAdded={handleFormChange}
              onDeleted={handleFormChange}
            />
          </section>
        </>
      )}
    </div>
  );
}
