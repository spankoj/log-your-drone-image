import React, { useState } from 'react';
import styles from '../styles/AddInput.module.css';

function AddInput() {
  const [nameField, setNameField] = useState('');
  const [category, setCategory] = useState('');

  const handleNameField = (e) => {
    setNameField(e.target.value);
  };

  return (
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
        <label className={styles.label} htmlFor="category">
          Category
        </label>
        <select className={styles.input} name="category" id="category">
          <option value="building">Building</option>
          <option value="monument">Monument</option>
          <option value="landscape">Landscape</option>
        </select>
      </div>

      <input className="btn" type="submit" />
    </form>
  );
}

export default AddInput;
