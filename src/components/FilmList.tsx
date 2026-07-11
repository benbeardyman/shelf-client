import type { Film } from '../types'
import { api } from '../api'

function Stars({ n }: { n: number | null }) {
  if (!n) return null
  return <span className="stars">{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>
}

export function FilmList({ films, onChanged }: { films: Film[]; onChanged: () => void }) {
  if (!films.length) return <p className="empty">No films yet.</p>

  return (
    <ul className="item-list">
      {films.map(f => (
        <li key={f.id} className="item-card">
          <div className="item-main">
            <strong>{f.title}</strong>
            <span className="item-sub">{f.director ? `Dir. ${f.director}` : ''}{f.year ? ` (${f.year})` : ''}</span>
            {f.genre && <span className="tag">{f.genre}</span>}
          </div>
          <div className="item-meta">
            <Stars n={f.rating} />
            {f.date_watched && <span className="date">Watched {f.date_watched}</span>}
          </div>
          {f.notes && <p className="notes">{f.notes}</p>}
          <button
            className="delete-btn"
            onClick={async () => { await api.films.remove(f.id); onChanged() }}
            aria-label="Delete"
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  )
}
