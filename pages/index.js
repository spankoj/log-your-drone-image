// import fs from 'fs';
// import exif from 'jpeg-exif';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import ImageList from '../components/ImageList';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';

export default function Home({ exifData, images }) {
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  // const latitude =
  //   exifData.GPSInfo.GPSLatitude[0] + '.' + exifData.GPSInfo.GPSLatitude[1];
  // console.log(exifData.GPSInfo.GPSAltitude[0]);
  // console.log(exifData);
  // alert(exifData.GPSInfo.GPSLatitude[0]);
  // alert(latitude);

  return (
    <Layout>
      <main className={styles.main}>
        <h2>Your Drone Images</h2>
        <div className={styles.div}>
          <Link href="./add-data">
            <a className="btn">Add Image</a>
          </Link>
        </div>
        <div className={styles.div}>
          <MapWithNoSSR images={images} />
        </div>
        <div className={styles.div}>
          <ImageList images={images} />
        </div>
        {/* {images.length === 0 && <h3>No Images to show</h3>} */}
      </main>
    </Layout>
  );
}

// Import use get server side props syntax
export async function getServerSideProps() {
  // Exif library code
  // const filePath = './public/uploads/DJI_0001.jpg';
  // const buffer = fs.readFileSync(filePath);
  // const exifData = exif.fromBuffer(buffer);
  // const res = await fetch(
  //   process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/images',
  // );
  // const images = await res.json();

  const { getImages } = await import('../utils/database');

  const images = await getImages();

  console.log('images', images);

  return {
    props: {
      images: images,
      // exifData,
    },
  };
}
