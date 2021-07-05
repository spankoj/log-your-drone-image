import camelcaseKeys from 'camelcase-keys';
import dotenvSafe from 'dotenv-safe';
import postgres from 'postgres';

dotenvSafe.config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

//Perform first query

export async function getImages() {
  const images = await sql`SELECT*FROM images`;
  return images.map((prod) => camelcaseKeys(prod));
}

// Get single product

// export async function getProductBySlug(slug) {
//   const products = await sql`
//   SELECT
//   *
//   FROM
//   products
//   WHERE
//   slug = ${slug}`;

//   return products.map((prod) => camelcaseKeys(prod))[0];
// }

export async function insertImage(
  name,
  category,
  make,
  model,
  dateTimeOriginal,
  gpsAltitude,
  gpsLatitude,
  gpsLongitude,
  secureUrl,
) {
  const images = await sql`
    INSERT INTO images
      (name,
      category,
      make,
      model,
      date_time_original,
      gps_altitude,
      gps_latitude,
      gps_longitude,
      secure_url)
    VALUES
      (${name}, ${category}, ${make}, ${model},${dateTimeOriginal},${gpsAltitude},${gpsLatitude},${gpsLongitude},${secureUrl},)
    RETURNING
      name,
      category,
      make,
      model,
      date_time_original,
      gps_altitude,
      gps_latitude,
      gps_longitude,
      secure_url
  `;
  return images.map((img) => camelcaseKeys(img))[0];
}

// const images = [
//   {
//     name: 'mura',
//     category: 'landscape',
//     Make: 'samsung',
//     Model: 'SM-G950F',
//     DateTimeOriginal: '2019:07:26 10:57:57',
//     GPSAltitude: '256.296',
//     GPSAltitudeRef: 'Above Sea Level',
//     GPSLatitude: '46 deg 31\' 52.00" N',
//     GPSLatitudeRef: 'North',
//     GPSLongitude: '16 deg 22\' 46.00" E',
//     GPSLongitudeRef: 'East',
//     url: 'http://res.cloudinary.com/spankoj/image/upload/v1625211951/s1xmzde0mfmwkquwpazp.jpg',
//     secure_url:
//       'https://res.cloudinary.com/spankoj/image/upload/v1625211951/s1xmzde0mfmwkquwpazp.jpg',
//   },
//   {
//     name: 'sopron',
//     category: 'building',
//     Make: 'DJI',
//     Model: 'FC7303',
//     DateTimeOriginal: '2021:06:24 20:39:49',
//     GPSAltitude: '256.296 m',
//     GPSAltitudeRef: 'Above Sea Level',
//     GPSLatitude: '47 deg 40\' 38.33" N',
//     GPSLatitudeRef: 'North',
//     GPSLongitude: '16 deg 36\' 16.40" E',
//     GPSLongitudeRef: 'East',
//     url: 'http://res.cloudinary.com/spankoj/image/upload/v1625211853/el13fpuffgowboitpeda.jpg',
//     secure_url:
//       'https://res.cloudinary.com/spankoj/image/upload/v1625211853/el13fpuffgowboitpeda.jpg',
//   },
//   {
//     name: 'amphitheatre',
//     category: 'landscape',
//     Make: 'DJI',
//     Model: 'FC7303',
//     DateTimeOriginal: '2021:06:28 18:00:59',
//     GPSAltitude: '343.687 m',
//     GPSAltitudeRef: 'Above Sea Level',
//     GPSLatitude: '48 deg 6\' 37.40" N',
//     GPSLatitudeRef: 'North',
//     GPSLongitude: '16 deg 51\' 8.28" E',
//     GPSLongitudeRef: 'East',
//     url: 'http://res.cloudinary.com/spankoj/image/upload/v1625211760/jiluggwarypfl2d2yeys.jpg',
//     secure_url:
//       'https://res.cloudinary.com/spankoj/image/upload/v1625211760/jiluggwarypfl2d2yeys.jpg',
//   },
//   {
//     name: 'sonnensee',
//     category: 'landscape',
//     Make: 'DJI',
//     Model: 'FC7303',
//     DateTimeOriginal: '2021:06:28 10:32:54',
//     GPSAltitude: '460.464 m',
//     GPSAltitudeRef: 'Above Sea Level',
//     GPSLatitude: '47 deg 37\' 41.46" N',
//     GPSLatitudeRef: 'North',
//     GPSLongitude: '16 deg 28\' 12.45" E',
//     GPSLongitudeRef: 'East',
//     url: 'http://res.cloudinary.com/spankoj/image/upload/v1625208747/xxc2bk9rf0onupbx5gob.jpg',
//     secure_url:
//       'https://res.cloudinary.com/spankoj/image/upload/v1625208747/xxc2bk9rf0onupbx5gob.jpg',
//   },
// ];
