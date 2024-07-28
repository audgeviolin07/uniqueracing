import React from 'react';
import './Road.css';

interface RoadProps {
  id: string;
  classes: string;
}

const Road: React.FC<RoadProps> = ({ id, classes }) => {
  const stripes = Array.from({ length: 10 }, (_, i) => (
    <div
      key={i}
      className={`stripe ${classes}`}
      style={{ top: `${i * 10 + 2}%` }}
    ></div>
  ));
  return (
    <div id={id} className='road'>
      {stripes}
    </div>
  );
};

export default Road;
