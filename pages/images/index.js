import nextCookies from 'next-cookies';
import { useEffect, useState } from 'react';
import ImageList from '../../components/ImageList';
import Layout from '../../components/Layout';
import styles from '../../styles/Images.module.css';
import { convertQueryValueToStringLike } from '../../utils/context';

export default function Login({ imagesFetched, query }) {
  const [images, setImages] = useState([...imagesFetched]); //g

  const filterImagesById = (id) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
  };

  const searchImagesByValue = (value) => {
    const updatedImages = images.filter((img) => {
      return Object.values(img).some((str) =>
        String(str).toLowerCase().includes(value),
      );
    });
    setImages(updatedImages);
  };

  useEffect(() => {
    if (query) {
      searchImagesByValue(query);
    }
  }, [query]);

  return (
    <Layout title="Images">
      <main className={styles.main}>
        <div className={styles.div}>
          <ImageList
            filterImagesById={filterImagesById}
            filteredImages={images}
          />
        </div>
      </main>
      {/* <Link href="/">
        <a>Home</a>
      </Link> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getImages, searchFunction, getSessionByToken } = await import(
    '../../utils/database'
  );

  const imagesFetched = await getImages();

  // get current search query value from url and
  // parse to stringlike (i.e. not array of strings)
  const query = convertQueryValueToStringLike(context.query.s);
  const filteredImages = await searchFunction(query);

  // console.log('context:', context);
  // console.log('context:', query);
  // console.log('query:', query);
  // console.log('images:', filteredImages);
  //van-é token a frontenden
  const token = nextCookies(context).token;

  const session = await getSessionByToken(token);
  // console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/login?returnTo=/images',
        permanent: false,
      },
    };
  }

  return {
    props: {
      query: query ? query : null,
      imagesFetched: imagesFetched,
      filteredImages: filteredImages,
    },
  };
}
