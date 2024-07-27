import React from 'react';
import Car from './Car';
import './Road.css';

const Road: React.FC = () => {
  return (
    <div className="road">
      <Car />
      <div className="stripe"></div>
      <div className="stripe"></div>
      <div className="stripe"></div>
      <div className="stripe"></div>
      <div className="stripe"></div>
    </div>
  );
};

export default Road;
