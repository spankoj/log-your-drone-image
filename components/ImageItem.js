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
        {/* <h4>Name:</h4> */}
        <h3>{img.name}</h3>
      </div>

      <div className={styles.makemodel}>
        {/* <h4>Category:</h4> */}
        <h4>{img.category}</h4>
      </div>

      <div className={styles.buttons}>
        <div className={styles.details}>
          <Link href={`/images/${img.id}`}>
            <a className="btn">See details</a>
          </Link>
        </div>
        <div className={styles.btn}>
          <button
            className={styles.btnDel}
            onClick={async () => {
              const response = await fetch(`http://localhost:3000/api/images`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: img.id }),
              });

              if (response.status === 200) {
                filterImagesById(img.id);
              }
            }}
          >
            Delete image
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageItem;
