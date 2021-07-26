/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/AddInput.module.css';
import { dmsToDecimal } from './MapLeaflet';

function AddInput({ data, setData }) {
  const router = useRouter();

  const handleNameField = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const handleCategory = (e) => {
    setData({ ...data, category: e.target.value });
  };

  return (
    <form
      className={styles.form}
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/api/images`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: data,
          }),
        });

        const coordsArray = dmsToDecimal(data.gpsLatitude, data.gpsLongitude);

        router.push({
          pathname: '/',
          query: { coordsArray: coordsArray },
        });
      }}
    >
      <div className={styles.control}>
        <label className={styles.label} htmlFor="name">
          Descriptive Name
        </label>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Name it!"
          onChange={handleNameField}
        />
      </div>

      <div className={styles.control}>
        <label className={styles.label} htmlFor="category">
          Category
        </label>
        <select
          className={styles.input}
          name="category"
          id="category"
          onChange={handleCategory}
        >
          <option value="building">Building</option>
          <option value="monument">Monument</option>
          <option value="landscape">Landscape</option>
          <option value="vegetation">Vegetation</option>
        </select>
      </div>

      <input className="btn" type="submit" />
    </form>
  );
}

export default AddInput;
