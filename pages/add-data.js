import React, { useState } from 'react';
import AddInput from '../components/AddInput';
import ImageUploader from '../components/ImageUploader';
import Layout from '../components/Layout';
import styles from '../styles/AddData.module.css';

function addData(props) {
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

  const onChange = async (formData) => {
    const response = await uploadFileRequest(formData, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total),
      );
    });

    console.log('response', response);
  };
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

export default addData;
