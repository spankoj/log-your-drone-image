import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ExternalStateExample from './ExternalStateExample';

// import GeoSearch from './GeoSearch';
// import LocationMarker from './LocationMarker';

const Map = () => {
  return (
    <>
      <ExternalStateExample />
    </>
  );
};

export default Map;
