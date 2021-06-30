import fs from 'fs';
import exif from 'jpeg-exif';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function Home({ exifData }) {
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  const latitude =
    exifData.GPSInfo.GPSLatitude[0] + '.' + exifData.GPSInfo.GPSLatitude[1];
  console.log(exifData.GPSInfo.GPSAltitude[0]);
  // alert(exifData.GPSInfo.GPSLatitude[0]);
  alert(latitude);

  return (
    <Layout>
      <main>
        <h2>Log Your Drone Image</h2>
        <div>
          <MapWithNoSSR />
        </div>
        <Link href="./add-data">
          <a className="btn">Add Image</a>
        </Link>
      </main>
    </Layout>
  );
}
// Import use get server side props syntax
export async function getServerSideProps() {
  const filePath = './public/uploads/DJI_0001.jpg';
  const buffer = fs.readFileSync(filePath);
  const exifData = exif.fromBuffer(buffer);

  return {
    props: {
      exifData,
    },
  };
}
