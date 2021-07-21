import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import Link from 'next/link';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BasemapLayer, FeatureLayer } from 'react-esri-leaflet';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import DisplayPosition from './DisplayPosition';

export const dmsToDecimal = function (gpsLatitude, gpsLongitude) {
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
};

const MapLeaflet = ({ images, coordsFromUploadedImg }) => {
  // const coordArray = images.map((image) => {
  //   return dmsToDecimal(image.gpsLatitude, image.gpsLongitude);
  // });
  // external stat example
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={
          coordsFromUploadedImg ? coordsFromUploadedImg : [47.68501, 16.59049]
        }
        zoom={coordsFromUploadedImg ? 15 : 6}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{ height: 450, width: '100%' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OSM">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="BlackAndWhite">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Streets">
            <BasemapLayer name="Streets" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Topographic">
            <BasemapLayer name="Topographic" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Imagery">
            <BasemapLayer name="Imagery" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Terrain">
            <BasemapLayer name="Terrain" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Physical">
            <BasemapLayer name="Physical" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="ShadedRelief">
            <BasemapLayer name="ShadedRelief" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="DarkGray">
            <BasemapLayer name="DarkGray" />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Gray">
            <BasemapLayer name="Gray" />
          </LayersControl.BaseLayer>

          <MarkerClusterGroup>
            {images.map((image) => {
              return (
                <Marker
                  position={dmsToDecimal(image.gpsLatitude, image.gpsLongitude)}
                  key={image.id}
                >
                  <Popup maxWidth={400}>
                    <Link href={`/images/${image.id}`} passHref>
                      <img
                        src={image.secureUrl}
                        alt="custom"
                        width="400"
                        height="225"
                      />
                    </Link>
                    {image.name}
                  </Popup>
                  <Tooltip permanent>{image.name}</Tooltip>
                </Marker>
              );
            })}
          </MarkerClusterGroup>
        </LayersControl>

        <EsriLeafletGeoSearch
          position="topleft"
          useMapBounds={false}
          placeholder="Search for places or addresses"
          providers={{
            arcgisOnlineProvider: {
              apikey:
                'AAPK51bc7353b41a46ec83f7f7e8710e1efcI8p8NjQL1PPTbZqjXii16XUDHPLDQS87gQG8CNiguxkLsn7a5xcuHb-3rjv_l07P',
            },
            featureLayerProvider: {
              url: 'https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GIS_Day_Registration_Form_2019_Hosted_View_Layer/FeatureServer/0',
              searchFields: ['event_name', 'host_organization'],
              label: 'GIS Day Events 2019',
              bufferRadius: 5000,
              formatSuggestion: function (feature) {
                return (
                  feature.properties.event_name +
                  ' - ' +
                  feature.properties.host_organization
                );
              },
            },
          }}
          eventHandlers={{
            requeststart: () => console.log('Started request...'),
            requestend: () => console.log('Ended request...'),
            results: (r) => console.log(r),
          }}
          key="AAPK51bc7353b41a46ec83f7f7e8710e1efcI8p8NjQL1PPTbZqjXii16XUDHPLDQS87gQG8CNiguxkLsn7a5xcuHb-3rjv_l07P"
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
};

export default MapLeaflet;
