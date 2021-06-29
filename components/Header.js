import Link from 'next/link';

export default function Header(props) {
  return (
    <header>
      <div>
        <img src="/images/lydi-logo.png" alt="icon" />
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
