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

// // Connect to the database
// const sql = postgres();

// Perform first query

export async function getProducts() {
  const products = await sql`SELECT*FROM products`;
  return products.map((prod) => camelcaseKeys(prod));
}

// Get single product

export async function getProductBySlug(slug) {
  const products = await sql`
  SELECT
  *
  FROM
  products
  WHERE
  slug = ${slug}`;

  return products.map((prod) => camelcaseKeys(prod))[0];
}
