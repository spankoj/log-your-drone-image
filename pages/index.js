import fs from 'fs';
import exif from 'jpeg-exif';
import dynamic from 'next/dynamic';
import React from 'react';
import Layout from '../components/Layout';

export default function Home({ exifData }) {
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  // alert(exifData.GPSInfo.GPSAltitude);
  console.log(exifData);

  return (
    <Layout>
      <main>
        <h1>Welcome to Log Your Drone Image!</h1>
        <input type="file"></input>
        <div>
          <MapWithNoSSR />
        </div>
      </main>
    </Layout>
  );
}
// Import use get server side props syntax
export async function getServerSideProps() {
  const filePath = './public/images/dimg-kassai.jpg';
  const buffer = fs.readFileSync(filePath);
  const exifData = exif.fromBuffer(buffer);

  return {
    props: {
      exifData,
    },
  };
}
