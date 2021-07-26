import Head from 'next/head';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="discription" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Log Your Drone Image',
  description: 'Web application to collect drone images and its meta-data',
  keywords: 'Drone, Image, Exif',
};
