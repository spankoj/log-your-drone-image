import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import LocationMarker from './LocationMarker';

const Map = ({ images }) => {
  // GPS unit converter
  const dmsToDecimal = function (gpsLatitude, gpsLongitude) {
    // make one string of the lat and long data
    const dmsString = [gpsLatitude, gpsLongitude].join(' ');
    // console.log(dmsString);

    const dmsToLonLatRegex = /[-]{0,1}[\d.]*[\d]|([NSEW])+/g;
    const dmsParsed = dmsString.match(dmsToLonLatRegex);
    // console.log(dmsParsed);

    const dmsParsedObj = {
      latitude: {
        degree: dmsParsed[0],
        minute: dmsParsed[1],
        second: dmsParsed[2],
        direction: dmsParsed[3],
      },
      longitude: {
        degree: dmsParsed[4],
        minute: dmsParsed[5],
        second: dmsParsed[6],
        direction: dmsParsed[7],
      },
    };
    const dmsToLonLat = function (o) {
      let n = NaN;
      if (o) {
        const t = Number(o.degree),
          d = 'undefined' != typeof o.minute ? Number(o.minute) / 60 : 0,
          l = 'undefined' != typeof o.second ? Number(o.second) / 3600 : 0,
          r =
            o.direction ||
            (null !== r && /[SW]/i.test(r) && (t = -1 * Math.abs(t)));

        n = 0 > t ? t - d - l : t + d + l;
      }
      return n;
    };

    const lonLat = [
      dmsToLonLat(dmsParsedObj.latitude),
      dmsToLonLat(dmsParsedObj.longitude),
    ];
    return lonLat;
    console.log(lonLat);
  };
  console.log(
    'function:',
    dmsToDecimal(images[0].gpsLatitude, images[0].gpsLongitude),
  );

  const coordArray = images.map((image) => {
    return dmsToDecimal(image.gpsLatitude, image.gpsLongitude);
  });
  console.log(`coordArray:`, coordArray);

  // console.log(images);

  return (
    <div>
      <MapContainer
        center={[47.68501, 16.59049]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <LocationMarker images={images} /> */}
        <MarkerClusterGroup>
          {images.map((image) => {
            // alert(images.secureUrl);
            console.log(image[0]);
            return (
              <Marker
                position={dmsToDecimal(image.gpsLatitude, image.gpsLongitude)}
                key={image.id}
              >
                <Popup>
                  <img
                    src={image.secureUrl}
                    alt="custom"
                    width="200"
                    height="200"
                  />
                  <br />
                  {image.name}
                </Popup>
                <Tooltip>{image.name}</Tooltip>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
