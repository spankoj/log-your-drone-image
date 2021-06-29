import dynamic from 'next/dynamic';
import Layout from '../components/Layout';

export default function MapTest() {
  const MapWithNoSSR = dynamic(() => import('../components/MapTest'), {
    loading: () => <p>MapTest is loading</p>,
    ssr: false,
  });
  return (
    <Layout title="MapTest">
      <main>
        <div>
          <h2>Map test</h2>
        </div>
        <div>
          <MapWithNoSSR />
        </div>
        {/* <Link href="/">
          <a>Home</a>
        </Link> */}
      </main>
    </Layout>
  );
}
