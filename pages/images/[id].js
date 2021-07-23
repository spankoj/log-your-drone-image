import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
// import { dmsToDecimal } from '../../components/MapLeaflet';
import styles from '../../styles/ImagePage.module.css';

function singleImage(props) {
  const router = useRouter();

  const navigateHome = function () {
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

    const coordsArray = dmsToDecimal(
      props.image.gpsLatitude,
      props.image.gpsLongitude,
    );
    router.push({
      pathname: '/',
      query: { coordsArray: coordsArray },
    });
  };

  return (
    <Layout>
      <main className={styles.event}>
        <h1 className={styles.center}>{props.image.name}</h1>

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
          <button className="btn" onClick={navigateHome}>
            Show location
          </button>
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
        <div className={styles.gpsflex}>
          <div className={styles.center}>
            <h4> Make:</h4>
            <p>{props.image.make}</p>
          </div>

          <div className={styles.center}>
            <h4>Model:</h4>
            <p>{props.image.model}</p>
          </div>

          <div className={styles.center}>
            <h4>Date:</h4>
            <p>{props.image.dateTimeOriginal.split(' ')[0]}</p>
          </div>
          <div className={styles.center}>
            <h4>Time:</h4>
            <p>{props.image.dateTimeOriginal.split(' ')[1]}</p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default singleImage;

export async function getServerSideProps(context) {
  const { getImageById } = await import('../../utils/database');

  const { id } = context.query;
  const image = await getImageById(id);

  return { props: { image } };
}
