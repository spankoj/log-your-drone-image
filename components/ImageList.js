import React from 'react';
import ImageItem from './ImageItem';

function ImageList({ images }) {
  return (
    <div>
      <h2>Image list</h2>
      {images.map((img) => {
        return <ImageItem key={img.id} img={img} />;
      })}
    </div>
  );
}

export default ImageList;
