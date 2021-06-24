import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ExternalStateExample from './ExternalStateExample';
import LocationMarker from './LocationMarker';

const Map = () => {
  //   if (navigator.geolocation)
  // navigator.geolocation.getCurrentPosition(
  //   function (position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     return
  //     const position = [51.505, -0.09];
  //   },
  //   function () {
  //     alert('could not get your position');
  //   },
  // );

  return (
    <>
      <MapContainer
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
      <ExternalStateExample />
      {/* <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <button>Find Me!</button> */}
    </>
  );
};

export default Map;
