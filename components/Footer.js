import Link from 'next/link';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2021 - Log Your Drone Image</p>
      <Link href="/about">About this project</Link>
    </footer>
  );
}
