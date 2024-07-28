import React, { useEffect, useState } from 'react';
import Road from '../components/Road';
import Car from '../components/Car';

const CarGame: React.FC = () => {
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWinner('player1'); // Set the winner to 'player1' after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

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
        <Car color='red' className={winner === 'player1' ? 'dash' : ''} />
      </div>
      <div style={{ position: 'relative' }}>
        <Road id='player2' />
        <Car color='blue' className={winner === 'player2' ? 'dash' : ''} />
      </div>
    </div>
  );
};

export default CarGame;
