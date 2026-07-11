import { useEffect, useState } from 'react'
import { api } from './api'
import type { Book, Film } from './types'
import { AddBookForm } from './components/AddBookForm'
import { AddFilmForm } from './components/AddFilmForm'
import { BookList } from './components/BookList'
import { FilmList } from './components/FilmList'
import { ThemeToggle } from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import styles from './App.module.css'

type Tab = 'books' | 'films'

export default function App() {
  const { theme, setTheme } = useTheme()
  const [tab, setTab] = useState<Tab>('books')
  const [books, setBooks] = useState<Book[]>([])
  const [films, setFilms] = useState<Film[]>([])
  const [showForm, setShowForm] = useState(false)

  const loadBooks = async () => setBooks(await api.books.list())
  const loadFilms = async () => setFilms(await api.films.list())

  useEffect(() => { loadBooks(); loadFilms() }, [])

  const handleAdded = () => {
    setShowForm(false)
    tab === 'books' ? loadBooks() : loadFilms()
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Shelf</h1>
        <nav className={styles.nav}>
          <button className={tab === 'books' ? styles.active : ''} onClick={() => { setTab('books'); setShowForm(false) }}>
            Books ({books.length})
          </button>
          <button className={tab === 'films' ? styles.active : ''} onClick={() => { setTab('films'); setShowForm(false) }}>
            Films ({films.length})
          </button>
        </nav>
        <button className={styles.addBtn} onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : `+ Add ${tab === 'books' ? 'Book' : 'Film'}`}
        </button>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      <main>
        {showForm && (
          <section className={styles.formSection}>
            {tab === 'books'
              ? <AddBookForm onAdded={handleAdded} />
              : <AddFilmForm onAdded={handleAdded} />}
          </section>
        )}

        {tab === 'books'
          ? <BookList books={books} onChanged={loadBooks} />
          : <FilmList films={films} onChanged={loadFilms} />}
      </main>
    </div>
  )
}
