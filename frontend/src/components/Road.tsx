import React from 'react';
import './Road.css';

interface RoadProps {
  id: string;
}

const Road: React.FC<RoadProps> = ({ id }) => {
  return (
    <div id={id} className='road'>
      <div className='stripe'></div>
      <div className='stripe'></div>
      <div className='stripe'></div>
      <div className='stripe'></div>
      <div className='stripe'></div>
    </div>
  );
};

export default Road;
