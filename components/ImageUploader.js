import { useRef, useState } from 'react';

export default function ImageUploader({ defaultImage }) {
  const fileSelect = useRef(null);
  const [image, setImage] = useState(defaultImage);
  const [progress, setProgress] = useState(0);

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener('progress', (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const response = JSON.parse(xhr.responseText);

        setImage(response.secure_url);
        console.log(response.secure_url);
        console.log(response);
      }
    };

    fd.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
    );
    fd.append('tags', 'browser_upload');
    fd.append('file', file);
    fd.append('ablak', 'ablak');
    console.log('start');
    console.log(fd);
    xhr.send(fd);
  }
  return (
    <>
      {image ? (
        <img
          src={image.replace('upload/', 'upload/w_600/')}
          style={{ height: 400, width: 600 }}
        />
      ) : (
        <div style={{ height: 400, width: 600 }}>
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
      )}
    </>
  );
}
