import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles/AddInput.module.css';

function AddInput({ data, setData }) {
  const router = useRouter();

  const handleNameField = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const handleCategory = (e) => {
    setData({ ...data, category: e.target.value });
  };

  const dmsToDecimal = function (gpsLatitude, gpsLongitude) {
    // make one string of the lat and long data
    const dmsString = [gpsLatitude, gpsLongitude].join(' ');

    const dmsToLonLatRegex = /[-]{0,1}[\d.]*[\d]|([NSEW])+/g;
    const dmsParsed = dmsString.match(dmsToLonLatRegex);

    const dmsParsedObj = {
      latitude: {
        degree: dmsParsed[0],
        minute: dmsParsed[1],
        second: dmsParsed[2],
        direction: dmsParsed[3],
      },
      longitude: {
        degree: dmsParsed[4],
        minute: dmsParsed[5],
        second: dmsParsed[6],
        direction: dmsParsed[7],
      },
    };
    const dmsToLonLat = function (o) {
      let n = NaN;
      if (o) {
        const t = Number(o.degree),
          d = 'undefined' != typeof o.minute ? Number(o.minute) / 60 : 0,
          l = 'undefined' != typeof o.second ? Number(o.second) / 3600 : 0,
          r =
            o.direction ||
            (null !== r && /[SW]/i.test(r) && (t = -1 * Math.abs(t)));

        n = 0 > t ? t - d - l : t + d + l;
      }
      return n;
    };

    const lonLat = [
      dmsToLonLat(dmsParsedObj.latitude),
      dmsToLonLat(dmsParsedObj.longitude),
    ];
    return lonLat;
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
