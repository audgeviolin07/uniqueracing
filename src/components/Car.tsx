import React from 'react';
import './Car.css';

const Car: React.FC = () => {
  return (
    <div className='car'>
      <div className='roof'></div>
      <div className='hood'></div>
      <div className='trunk'></div>
      <div className='left-mirror'></div>
      <div className='right-mirror'></div>
      <div className='left-wheel front'></div>
      <div className='right-wheel front'></div>
      <div className='left-wheel back'></div>
      <div className='right-wheel back'></div>
    </div>
  );
};

export default Car;
