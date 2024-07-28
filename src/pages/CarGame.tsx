import React, { useEffect, useState } from 'react';
import Road from '../components/Road';
import Car from '../components/Car';



const CarGame: React.FC = () => {
  const [winner, setWinner] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'null'|'active'|'finished'>('null');

  useEffect(() => {
    const timer = setTimeout(() => {
      setWinner('player1'); // Set the winner to 'player1' after 5 seconds
      setGameState('finished');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const startGame = () => {
    setGameState('active');
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative' }}>
        <Road id='player1' classes={gameState === 'active'?'stripe-running' : ''} />
        <Car color='red' className={winner === 'player1' ? 'dash' : '' } leftPosition='0'/>
      </div>
      {gameState === 'null' && <div className='flex-vertical'>
        <button onClick={startGame}>Start Game</button>
      </div>}
      {gameState === 'finished' && <div className='flex-vertical'>
          Winner is {winner}
      </div>}
      <div style={{ position: 'relative' }}>
        <Road id='player2' classes={gameState === 'active'?'stripe-running' : ''} />
        <Car color='blue' className={winner === 'player2' ? 'dash' : ''} leftPosition='0'/>
      </div>
    </div>
  );
};

export default CarGame;
