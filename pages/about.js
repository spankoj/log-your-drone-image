import Link from 'next/link';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout title="About">
      <h1>About</h1>

      <p>
        This web site is created by{' '}
        <span style={{ fontWeight: 'bold' }}>János Spanyol</span> as a bootcamp
        project practicing Next.js framework.
      </p>
      <p>Version: 1.0.0</p>
      {/* sources: */}
      {/* <p>
        Sources used from <span style={{ fontWeight: 'bold' }}>xxxx</span> :
      </p>
      <ul>
        <li>yyyy</li>
        <li>zzzz</li>
      </ul> */}
      {/* <Link href="/">
        <a>Home</a>
      </Link> */}
    </Layout>
  );
}
