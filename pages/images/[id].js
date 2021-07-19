import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/ImagePage.module.css';

function singleImage(props) {
  return (
    <Layout>
      <main className={styles.event}>
        {/* <h1>Name:</h1> */}
        <h1 className={styles.center}>{props.image.name}</h1>

        {/* <h2 className={styles.cat}>{props.image.category}</h2> */}

        {/* <h2 className={styles.center}>GPS Data</h2> */}
        <div className={styles.gpsflex}>
          <div className={styles.center}>
            <h4> Altitude:</h4>
            <p>{props.image.gpsAltitude}</p>
          </div>

          <div className={styles.center}>
            <h4>Latitude:</h4>
            <p>{props.image.gpsLatitude}</p>
          </div>

          <div className={styles.center}>
            <h4>Longitude:</h4>
            <p>{props.image.gpsLongitude}</p>
          </div>
        </div>

        {props.image.secureUrl && (
          <div className={styles.image}>
            <Image
              src={props.image.secureUrl}
              alt="image"
              width="960"
              height="600"
            />
          </div>
        )}
        <span>
          {`Date: ${props.image.dateTimeOriginal.split(' ')[0]} `} at{' '}
          {`Time: ${props.image.dateTimeOriginal.split(' ')[1]}`}
        </span>

        <div className={styles.control}>
          <Link href={`/images`}>
            <a className="btn">Images</a>
          </Link>
        </div>

        {/* <h1>Category: {props.image.category}</h1> */}

        {/* <div className={styles.info}> */}

        {/* </div> */}
      </main>
    </Layout>
  );
}

export default singleImage;

export async function getServerSideProps(context) {
  const { getImageById } = await import('../../utils/database');

  const { id } = context.query;
  const image = await getImageById(id);

  console.log(image);
  return { props: { image } };
}
