import React, { useMemo, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import DisplayPosition from './DisplayPosition';

const center = [51.505, -0.09];
const zoom = 13;

function ExternalStateExample() {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        whenCreated={setMap}
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    ),
    [],
  );
  return (
    <div>
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}

export default ExternalStateExample;
