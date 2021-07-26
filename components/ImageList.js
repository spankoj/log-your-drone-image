import React from 'react';
import ImageItem from './ImageItem';

function ImageList({ filteredImages, filterImagesById }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'Julius Sans One' }}>Image list</h2>
      {filteredImages.map((img) => {
        return (
          <ImageItem
            filterImagesById={filterImagesById}
            key={img.id}
            img={img}
          />
        );
      })}
    </div>
  );
}

export default ImageList;
