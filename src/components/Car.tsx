import React from 'react';
import './Car.css';

interface CarProps {
  color: string;
}

const Car: React.FC<CarProps> = ({ color }) => {
  return (
    <div className='car' style={{ background: color }}>
      <div className='roof'></div>
      <div className='hood' style={{ background: color }}></div>
      <div className='trunk' style={{ background: color }}></div>
      <div className='left-mirror' style={{ background: color }}></div>
      <div className='right-mirror' style={{ background: color }}></div>
      <div className='left-wheel front'></div>
      <div className='right-wheel front'></div>
      <div className='left-wheel back'></div>
      <div className='right-wheel back'></div>
    </div>
  );
};

export default Car;
