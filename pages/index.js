// import fs from 'fs';
// import exif from 'jpeg-exif';
import dynamic from 'next/dynamic';
import React from 'react';

export default function Home({ exifData }) {
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  console.log(exifData);
  return (
    <main>
      <h1>Welcome to Log Your Drone Image!</h1>
      <div>
        <MapWithNoSSR />
      </div>
    </main>
  );
}

// export async function getStaticProps() {
//   const filePath = '~/Documents/testexif.jpg';
//   const buffer = fs.readFileSync(filePath);
//   const exifData = exif.fromBuffer(buffer);

//   return {
//     props: {
//       exifData,
//     },
//   };
// }
