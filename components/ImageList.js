import React from 'react';
import ImageItem from './ImageItem';

function ImageList({ filteredImages }) {
  return (
    <div>
      <h2>Image list</h2>
      {filteredImages.map((img) => {
        return <ImageItem key={img.id} img={img} />;
      })}
    </div>
  );
}

export default ImageList;
