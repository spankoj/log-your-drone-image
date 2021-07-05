import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../styles/ImageItem.module.css';

function ImageItem({ img }) {
  return (
    <div className={styles.product}>
      <div className={styles.img}>
        <Image src={img.secureUrl} alt="image" width={250} height={150} />
      </div>

      <div className={styles.info}>
        <h3>{img.name}</h3>
        <h4>{img.category}</h4>
        <h4>{img.dateTimeOriginal}</h4>
      </div>

      {/* <div className={styles.link}>
        <Link href={`#`}>
          <a className="btn">See details</a>
        </Link>
      </div> */}
    </div>
  );
}

export default ImageItem;
