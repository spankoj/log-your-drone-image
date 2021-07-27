import React, { useState } from 'react';
import AddInput from '../components/AddInput';
import ImageUploader from '../components/ImageUploader';
import Layout from '../components/Layout';
import styles from '../styles/AddData.module.css';

function AddData() {
  const [data, setData] = useState({
    name: '',
    category: '',
    make: '',
    model: '',
    dateTimeOriginal: '',
    gpsAltitude: '',
    gpsLatitude: '',
    gpsLongitude: '',
    secureUrl: '',
  });
  // const ImageUploaderSsr = dynamic(
  //   () => import('../components/ImageUploader'),
  //   {
  //     // eslint-disable-next-line react/no-unstable-nested-components
  //     loading: () => <p>A map is loading</p>,
  //     ssr: false,
  //   },
  // );
  return (
    <Layout title="Add Data">
      <main>
        <h2 className={styles.control}> Log Images</h2>
        <div className={styles.control}>
          <ImageUploader data={data} setData={setData} />
        </div>
        <AddInput data={data} setData={setData} />
      </main>
    </Layout>
  );
}

export default AddData;
