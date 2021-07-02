import axios from 'axios';
import React from 'react';
import styles from '../styles/AddInput.module.css';

function AddInput({ data, setData }) {
  const handleNameField = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const handleCategory = (e) => {
    setData({ ...data, category: e.target.value });
  };
  console.log(data);
  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/images', data);
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
          placeholder="best-drone-image-ever"
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
        </select>
      </div>

      <input className="btn" type="submit" />
    </form>
  );
}

export default AddInput;
