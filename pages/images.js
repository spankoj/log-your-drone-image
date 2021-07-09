import ImageList from '../components/ImageList';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { convertQueryValueToStringLike } from '../utils/context';

export default function Login({ images, filteredImages }) {
  return (
    <Layout title="Images">
      <main className={styles.main}>
        <div className={styles.div}>
          <ImageList filteredImages={filteredImages} />
        </div>
      </main>
      {/* <Link href="/">
        <a>Home</a>
      </Link> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getImages, searchFunction } = await import('../utils/database');

  const images = await getImages();

  console.log('images:', images);

  // get current search query value from url and
  // parse to stringlike (i.e. not array of strings)
  const query = convertQueryValueToStringLike(context.query.s);
  const filteredImages = await searchFunction(query);

  // console.log('context:', context);
  console.log('context:', query);
  console.log('query:', query);
  console.log('images:', filteredImages);

  return {
    props: {
      images: images,
      filteredImages: filteredImages,
    },
  };
}
