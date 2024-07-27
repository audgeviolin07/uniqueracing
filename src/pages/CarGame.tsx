import React from 'react';
import Road from '../components/Road';
import Car from '../components/Car';

const CarGame: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Road id='player1' />
        <Car color='linear-gradient(45deg, #6fbdf3, #4ea0d3, #2e8cb3)' />
      </div>
      <div style={{ position: 'relative' }}>
        <Road id='player2' />
        <Car color='blue' />
      </div>
    </div>
  );
};

export default CarGame;
