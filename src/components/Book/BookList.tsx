import { useState } from 'react';
import type { Book } from '../../types';
import styles from '../item.module.css';
import { BookForm } from './BookForm';

function Stars({ n }: { n: number | null }) {
  if (!n) return null;
  return (
    <span className={styles.stars}>
      {'★'.repeat(n)}
      {'☆'.repeat(5 - n)}
    </span>
  );
}

export function BookList({
  books,
  onChanged,
}: {
  books: Book[];
  onChanged: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  if (!books.length) return <p className={styles.empty}>No books yet.</p>;

  const handleFormChange = () => {
    setShowForm(false);
    setSelectedBookId(null);
    onChanged();
  };

  return (
    <div>
      <ul className={styles.itemList}>
        {books.map((b) => (
          <li key={b.id} className={styles.itemCard}>
            <div className={styles.itemMain}>
              <strong>{b.title}</strong>
              <span className={styles.itemSub}>
                {b.author}
                {b.year ? ` (${b.year})` : ''}
              </span>
              {b.genre && <span className={styles.tag}>{b.genre}</span>}
            </div>
            <div className={styles.itemMeta}>
              <Stars n={b.rating} />
              {b.date_read && (
                <span className={styles.date}>Read {b.date_read}</span>
              )}
            </div>
            {b.notes && <p className={styles.notes}>{b.notes}</p>}
            <button
              className={styles.editBtn}
              onClick={() => {
                setSelectedBookId(String(b.id));
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
            <BookForm
              bookId={selectedBookId}
              onAdded={handleFormChange}
              onDeleted={handleFormChange}
            />
          </section>
        </>
      )}
    </div>
  );
}
