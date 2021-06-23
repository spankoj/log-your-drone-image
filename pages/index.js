import dynamic from 'next/dynamic';
import React from 'react';

export default function Home() {
  const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  return (
    <main>
      <h1>Welcome to Log Your Drone Image!</h1>
      <div style={{ height: 400, width: '100%' }}>
        <MapWithNoSSR />
      </div>
    </main>
  );
}
