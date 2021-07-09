import Image from 'next/image';
import React from 'react';
import styles from '../../styles/ImageItem.module.css';

function singleImage(props) {
  return (
    <div className={styles.product}>
      <div className={styles.img}>
        <Image
          src={props.image.secureUrl}
          alt="image"
          width={250}
          height={150}
        />
      </div>

      <div className={styles.info}>
        <h3>Name:</h3>
        <h4>{props.image.name}</h4>
        <h3>Category:</h3>
        <h4>{props.image.category}</h4>
        <p>{`Date: ${props.image.dateTimeOriginal.split(' ')[0]} `}</p>
        <p>{`Time: ${props.image.dateTimeOriginal.split(' ')[1]}`}</p>
        <h4>{props.image.gpsAltitude}</h4>
        <h4>{props.image.gpsLatitude}</h4>
        <h4>{props.image.gpsLongitude}</h4>
      </div>
    </div>
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
