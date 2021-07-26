/* eslint-disable @typescript-eslint/naming-convention */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home({ images }) {
  const router = useRouter();

  const MapWithNoSSR = dynamic(() => import('../components/MapLeaflet'), {
    // eslint-disable-next-line react/no-unstable-nested-components
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.add}>
          <Link href="/add-data">
            <a className="btn">Add Image</a>
          </Link>
        </div>

        <div className={styles.div}>
          <MapWithNoSSR
            images={images}
            coordsFromUploadedImg={router.query.coordsArray}
          />
        </div>
        {/* <select
          className={styles.input}
          name="category"
          id="category"
          // onChange={handleCategory}
        >
          <option value="building">Building</option>
          <option value="monument">Monument</option>
          <option value="landscape">Landscape</option>
          <option value="landscape">Vegetation</option>
        </select> */}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getImages } = await import('../utils/database');

  const images = await getImages();

  return {
    props: {
      images: images,
    },
  };
}
