import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/DisplayPosition.module.css';

const center = [47.68501, 16.59049];
const zoom = 8;

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);
  return (
    <div className={styles.latlong}>
      <button className={styles.btnPosition} onClick={onClick}>
        Reset
      </button>
      <span className={styles.span}>Latitude:</span> {position.lat.toFixed(4)},{' '}
      <span className={styles.span}>Longitude:</span> {position.lng.toFixed(4)}{' '}
    </div>
  );
}

export default DisplayPosition;
