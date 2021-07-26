// import cloudinary from 'cloudinary';
import axios from 'axios';
import React from 'react';

// import styles from '../styles/ImageUploader.module.css';

export default function ImageUploader({ setData, data }) {
  const generateSignature = function (callback, params_to_sign) {
    const { data } = axios.post(
      'https://localhost:3000/api/upload',
      params_to_sign,
    );
    callback(data);
  };

  const createCloudinaryWidget = () => {
    if (typeof window !== 'undefined') {
      // Initialize the widget

      const newWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'spankoj',
          uploadPreset: 'preset',
          apiKey: '368624667382459',
          sources: ['url', 'camera', 'local', 'google_drive'],
          showAdvancedOptions: true,
          cropping: true,
          multiple: false,
          defaultSource: 'local',
          styles: {
            palette: {
              window: '#000000',
              sourceBg: '#000000',
              windowBorder: '#8E9FBF',
              tabIcon: '#FFFFFF',
              inactiveTabIcon: '#8E9FBF',
              menuIcons: '#2AD9FF',
              link: '#08C0FF',
              action: '#336BFF',
              inProgress: '#00BFFF',
              complete: '#33ff00',
              error: '#EA2727',
              textDark: '#000000',
              textLight: '#FFFFFF',
            },
            fonts: {
              default: null,
              "'Space Mono', monospace": {
                url: 'https://fonts.googleapis.com/css?family=Space+Mono',
                active: true,
              },
            },
            // maxImageWidth: 1000,
            // maxImageHeight: 1000,
          },
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);

            setData({
              ...data,
              make: result.info.image_metadata.Make,
              model: result.info.image_metadata.Model,
              dateTimeOriginal: result.info.image_metadata.DateTimeOriginal,
              gpsAltitude: result.info.image_metadata.GPSAltitude,
              gpsLatitude: result.info.image_metadata.GPSLatitude,
              gpsLongitude: result.info.image_metadata.GPSLongitude,
              secureUrl: result.info.secure_url,
            });
          }
        },
      );

      return newWidget;
    }
  };

  const openCloudinaryWidget = () => {
    const widget = createCloudinaryWidget();
    widget.open();
  };

  return (
    // working solution------------------------------------
    <div>
      <div>
        <button
          className="btn-secondary"
          onClick={openCloudinaryWidget}
          type="button"
        >
          Upload
        </button>
      </div>

      {data.secureUrl ? (
        <img
          alt={'preview of upload '}
          src={data.secureUrl}
          style={{ height: 200, width: 400 }}
        />
      ) : (
        ''
      )}
    </div>
  );
}
