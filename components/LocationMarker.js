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
        <img
          src="https://res.cloudinary.com/spankoj/image/upload/v1625216939/daajx7gdq5ohgd2vg9c4.jpg"
          alt=""
          width="200"
          height="200"
        />
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
