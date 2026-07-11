import type { Theme } from '../hooks/useTheme'
import styles from './ThemeToggle.module.css'

interface Props {
  theme: Theme
  setTheme: (t: Theme) => void
}

export function ThemeToggle({ theme, setTheme }: Props) {
  return (
    <div className={styles.toggle}>
      <button title="Light" className={theme === 'light' ? styles.active : ''} onClick={() => setTheme('light')}>☀</button>
      <button title="System" className={theme === 'system' ? styles.active : ''} onClick={() => setTheme('system')}>◑</button>
      <button title="Dark" className={theme === 'dark' ? styles.active : ''} onClick={() => setTheme('dark')}>☾</button>
    </div>
  )
}
