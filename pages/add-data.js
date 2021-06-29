import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/AddData.module.css';

function addData() {
  return (
    <Layout title="Add Data">
      <div>
        <form className={styles.form}>
          <div className={styles.control}>
            <label className={styles.label} htmlFor="name">
              Descriptive Name
            </label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="best-drone-image-ever"
            />
          </div>
          <div className={styles.control}>
            <label className={styles.label}>Category</label>
            <select className={styles.input} name="category" id="id">
              <option>Building</option>
              <option>Monument</option>
              <option>Landscape</option>
            </select>
          </div>
          <div>
            <label className={styles.label}>Upload image</label>
            <input className={styles.input} type="file" />
          </div>
          <input className="btn" type="submit" />
        </form>
      </div>
      {/* <Link href="/">
        <a className="btn-secondary">Home</a>
      </Link> */}
    </Layout>
  );
}

export default addData;
