import Link from 'next/link';
import styles from '../styles/Header.module.css';

export default function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src="/images/favicon-lydi.png" alt="icon" />
        <Link href="/">
          <a>LYDI</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/map-test">
              <a>MapTest</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
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
        </ul>
      </nav>
    </header>
  );
}
