import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import ImageList from '../components/ImageList';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home({ images }) {
  const MapWithNoSSR = dynamic(() => import('../components/MapLeaflet'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  const router = useRouter();
  console.log(router.query);

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.div}>
          <MapWithNoSSR
            images={images}
            coordsFromUploadedImg={router.query.coordsArray}
          />
        </div>
        <div className={styles.add}>
          <Link href="/add-data">
            <a className="btn">Add Image</a>
          </Link>
        </div>
        <select
          className={styles.input}
          name="category"
          id="category"
          // onChange={handleCategory}
        >
          <option value="building">Building</option>
          <option value="monument">Monument</option>
          <option value="landscape">Landscape</option>
          <option value="landscape">Vegetation</option>
        </select>
        {/* <div className={styles.div}>
          <ImageList images={images} />
        </div> */}
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getImages } = await import('../utils/database');

  const images = await getImages();

  console.log('images:', images);

  return {
    props: {
      images: images,
    },
  };
}
