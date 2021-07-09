import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/ImageItem.module.css';

function ImageItem({ img, filterImagesById }) {
  return (
    <div className={styles.product}>
      <div className={styles.img}>
        <Image src={img.secureUrl} alt="image" width={250} height={150} />
      </div>

      <div className={styles.info}>
        <h3>Name:</h3>
        <h4>{img.name}</h4>

        {/* <p>{`Date: ${img.dateTimeOriginal.split(' ')[0]} `}</p>
        <p>{`Time: ${img.dateTimeOriginal.split(' ')[1]}`}</p> */}
        {/* <h4>{img.gpsAltitude}</h4>
        <h4>{img.gpsLatitude}</h4>
        <h4>{img.gpsLongitude}</h4> */}
      </div>
      <div className={styles.makemodel}>
        <h3>Category:</h3>
        <h4>{img.category}</h4>
      </div>
      <div className={styles.buttons}>
        <Link href={`/images/${img.id}`}>
          <a className="btn">See details</a>
        </Link>
        <button
          onClick={async () => {
            const response = await fetch(`http://localhost:3000/api/images`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id: img.id }),
            });

            if (response.status === 200) {
              filterImagesById(img.id); //g
            }
          }}
        >
          Delete image
        </button>
      </div>
    </div>
  );
}

export default ImageItem;
