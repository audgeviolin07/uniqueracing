import React from 'react';
import './Car.css';

interface CarProps {
  color: string;
  className?: string;
}

const Car: React.FC<CarProps> = ({ color, className }) => {
  return (
    <div className={`car ${className}`} style={{ backgroundColor: color }}>
      <div className='roof'></div>
      <div className='hood' style={{ backgroundColor: color }}></div>
      <div className='trunk' style={{ backgroundColor: color }}></div>
      <div className='left-mirror' style={{ backgroundColor: color }}></div>
      <div className='right-mirror' style={{ backgroundColor: color }}></div>
      <div className='left-wheel front'></div>
      <div className='right-wheel front'></div>
      <div className='left-wheel back'></div>
      <div className='right-wheel back'></div>
    </div>
  );
};

export default Car;
