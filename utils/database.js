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

export async function insertImage({
  name,
  category,
  make,
  model,
  dateTimeOriginal,
  gpsAltitude,
  gpsLatitude,
  gpsLongitude,
  secureUrl,
}) {
  console.log(
    name,
    category,
    make,
    model,
    dateTimeOriginal,
    gpsAltitude,
    gpsLatitude,
    gpsLongitude,
    secureUrl,
  );
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
      (${name}, ${category}, ${make}, ${model},${dateTimeOriginal},${gpsAltitude},${gpsLatitude},${gpsLongitude},${secureUrl})
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

// adapted from:
// https://www.emgoto.com/react-search-bar/

export async function searchFunction(query) {
  const images = await sql`
    SELECT
      *
    FROM
      images`;
  if (!query) {
    return images.map((img) => camelcaseKeys(img));
  } else {
    return images
      .filter((b) => {
        return Object.values(b).some((str) =>
          String(str).toLowerCase().includes(query),
        );
      })
      .map((img) => camelcaseKeys(img));
  }
}
