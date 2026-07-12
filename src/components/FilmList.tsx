import type { Film } from '../types';
import { api } from '../api';
import styles from './item.module.css';

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
  if (!films.length) return <p className={styles.empty}>No films yet.</p>;

  return (
    <ul className={styles.itemList}>
      {films.map((f) => (
        <li key={f.id} className={styles.itemCard}>
          <div className={styles.itemMain}>
            <strong>{f.title}</strong>
            <span className={styles.itemSub}>
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
            className={styles.deleteBtn}
            onClick={async () => {
              await api.films.remove(f.id);
              onChanged();
            }}
            aria-label='Delete'
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
