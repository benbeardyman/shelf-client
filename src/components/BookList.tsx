import type { Book } from '../types'
import { api } from '../api'

function Stars({ n }: { n: number | null }) {
  if (!n) return null
  return <span className="stars">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

export function BookList({ books, onChanged }: { books: Book[]; onChanged: () => void }) {
  if (!books.length) return <p className="empty">No books yet.</p>

  return (
    <ul className="item-list">
      {books.map(b => (
        <li key={b.id} className="item-card">
          <div className="item-main">
            <strong>{b.title}</strong>
            <span className="item-sub">{b.author}{b.year ? ` (${b.year})` : ''}</span>
            {b.genre && <span className="tag">{b.genre}</span>}
          </div>
          <div className="item-meta">
            <Stars n={b.rating} />
            {b.date_read && <span className="date">Read {b.date_read}</span>}
          </div>
          {b.notes && <p className="notes">{b.notes}</p>}
          <button
            className="delete-btn"
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
