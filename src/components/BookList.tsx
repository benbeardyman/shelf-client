import type { Book } from '../types'
import { api } from '../api'
import styles from './item.module.css'

function Stars({ n }: { n: number | null }) {
  if (!n) return null
  return <span className={styles.stars}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

export function BookList({ books, onChanged }: { books: Book[]; onChanged: () => void }) {
  if (!books.length) return <p className={styles.empty}>No books yet.</p>

  return (
    <ul className={styles.itemList}>
      {books.map(b => (
        <li key={b.id} className={styles.itemCard}>
          <div className={styles.itemMain}>
            <strong>{b.title}</strong>
            <span className={styles.itemSub}>{b.author}{b.year ? ` (${b.year})` : ''}</span>
            {b.genre && <span className={styles.tag}>{b.genre}</span>}
          </div>
          <div className={styles.itemMeta}>
            <Stars n={b.rating} />
            {b.date_read && <span className={styles.date}>Read {b.date_read}</span>}
          </div>
          {b.notes && <p className={styles.notes}>{b.notes}</p>}
          <button
            className={styles.deleteBtn}
            onClick={async () => { await api.books.remove(b.id); onChanged() }}
            aria-label="Delete"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}
