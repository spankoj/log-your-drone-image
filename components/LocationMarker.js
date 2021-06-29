import Image from 'next/image';
import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

function LocationMarker() {
  const [position, setPosition] = useState([51.505, -0.09]);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position === null ? null : (
    <Marker position={position}>
      <Popup>
        You are here
        {/* <Image
          src="https://kep.cdn.indexvas.hu/1/0/3851/38518/385187/38518709_931472779e8850f0a7ea12116dc14250_wm.jpg"
          alt="landing photo"
          width={200}
          height={200}
        /> */}
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
