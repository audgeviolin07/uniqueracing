import React from 'react';

interface ImageDisplayProps {
  imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
  return (
    <div>
      {imageUrl ? <img src={imageUrl} alt="Generated" /> : <p></p>}
    </div>
  );
};

export default ImageDisplay;
