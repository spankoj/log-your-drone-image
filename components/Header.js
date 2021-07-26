import Link from 'next/link';
import styles from '../styles/Header.module.css';
import SearchField from './SearchField';

// import cookies from 'next-cookies'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/favicon-lydi.png" alt="icon" />
        <Link href="/">
          <a>LYDI</a>
        </Link>
      </div>
      <SearchField />
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link href="/images">
              <a>Images</a>
            </Link>
          </li>

          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>

          <li>
            <Link href="/register">
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
