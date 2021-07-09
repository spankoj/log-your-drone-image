import Link from 'next/link';
import styles from '../styles/Header.module.css';
import SearchField from './SearchField';

export default function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/favicon-lydi.png" alt="icon" />
        <Link href="/">
          <a>LYDI</a>
        </Link>
      </div>
      <nav className={styles.nav}>
        <SearchField />

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
          <li></li>
          <li>
            <Link href="/map-test">
              <a>MapTest</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
