// import cloudinary from 'cloudinary';
import axios from 'axios';
import React from 'react';

// import styles from '../styles/ImageUploader.module.css';

export default function ImageUploader({ defaultImage, setData, data }) {
  // const fileSelect = useRef(null);
  // const [image, setImage] = useState(defaultImage);
  // const [progress, setProgress] = useState(0);

  // async function handleImageUpload() {
  //   if (fileSelect) {
  //     fileSelect.current.click();
  //   }
  // }

  // function handleFiles(files) {
  //   for (let i = 0; i < files.length; i++) {
  //     console.log(files[i]);
  //     uploadFile(files[i]);
  //   }
  // }

  // function uploadFile(file) {
  //   const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
  //   const xhr = new XMLHttpRequest();
  //   const fd = new FormData();

  //   xhr.open('POST', url, true);
  //   xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  //   // Update progress (can be used to show progress indicator)
  //   xhr.upload.addEventListener('progress', (e) => {
  //     setProgress(Math.round((e.loaded * 100.0) / e.total));
  //     console.log(Math.round((e.loaded * 100.0) / e.total));
  //   });

  //   xhr.onreadystatechange = (e) => {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //       const response = JSON.parse(xhr.responseText);

  //       setImage(response.secure_url);
  //       console.log(response.secure_url);
  //       console.log(response);

  //       setData({
  //         ...data,
  //         make: response.image_metadata.Make,
  //         model: response.image_metadata.Model,
  //         dateTimeOriginal: response.image_metadata.DateTimeOriginal,
  //         gpsAltitude: response.image_metadata.GPSAltitude,
  //         gpsLatitude: response.image_metadata.GPSLatitude,
  //         gpsLongitude: response.image_metadata.GPSLongitude,
  //         secureUrl: response.secure_url,
  //       });
  //     }
  //   };

  //   fd.append(
  //     'upload_preset',
  //     process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
  //   );
  //   fd.append('tags', 'browser_upload');
  //   fd.append('file', file);
  //   xhr.send(fd);
  // }
  // Uploading with widget------------------------------

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

      {/* {image ? (
        <img
          alt={'preview of upload '}
          src={image.replace('upload/', 'upload/w_600/')}
          style={{ height: 200, width: 400 }}
        />
      ) : (
        <div style={{ height: 200, width: 400 }}>
          <form>
            {progress === 0 ? (
              <div>
                <button onClick={handleImageUpload} type="button">
                  Browse
                </button>
              </div>
            ) : (
              <span>{progress}%</span>
            )}

            <input
              ref={fileSelect}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </form>

        </div>
      )} */}
    </div>
  );
}
