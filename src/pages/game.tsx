import React, { useState, useEffect } from 'react';
// import Car from '../components/Car';
import './game.css';
import CarCanva from './carCanva';
interface CarProps {
  className?: string;
  position?: string;
}

interface StatusProps {
  score: number;
  speed: number;
}

const backStart = 'giphy_frame.png';
const backActive = 'giphy-background.webp';

interface RoadProps {
  classes: string;
}

const Road: React.FC<RoadProps> = ({ classes }) => {
  const stripes = Array.from({ length: 3 }, (_, i) => (
    <div
      key={i}
      className={`stripe ${classes}`}
      style={{ top: `${i * 40 + 2}%` }}
    ></div>
  ));
  return (
    <div className="road-container">
      <div className="road">
          {stripes}
      </div>
      <div className={`road-border left-border ${classes !== ''? 'border-animate':''}`}></div>
      <div className={`road-border right-border ${classes !== ''? 'border-animate':''}`}></div>
    </div>
  );
};

const Car: React.FC<CarProps> = ({ className='', position }) => {



  return (
    <div className={`car flex-vertical ${className}`} style={{ left: `${position}` }}>
      <div className='flex-horizontal front-section'>
          <div className='wheel front left'></div>
          <div className='car-front'></div>
          <div className='wheel front right'></div>
      </div>
      <div className='chasis'>
        <div className='chasis inner'></div>
      </div>
      <div className='flex-horizontal'>
          <div className='wheel rear left'></div>
          <div className='car-back'>
            <div className='engine'>
              <div className='smoke-emitter'></div>
            </div>
          </div>
          <div className='wheel rear right'></div>
      </div>

  </div>
  );
  
};

const Status: React.FC<StatusProps> = ({ score, speed }) => {
  return (
    <div className="status">
      <div>Score: {score}</div>
      <div>Speed: {speed} mph</div>
    </div>
  );
};

export const Game: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [gameState, setGameState] = useState<'null'|'active'|'finished'>('null');
  // const [leftCarPosition, setLeftCarPosition] = useState<number>(40); // Adjusted for percentage
  // const [rightCarPosition, setRightCarPosition] = useState<number>(60); // Adjusted for percentage

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setScore((prev) => prev + 1);
  //     setSpeed((prev) => Math.min(prev + 1, 100)); // Max speed 100 mph
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);

  const handleStartClick = () => {
    setSpeed(50); // Initial speed
    setScore(10);
    setGameState('active');
  };

  return (
    <div className='game flex-vertical'>
      <Status score={score} speed={speed} />
      <Road classes={gameState === 'active'?'strip-animate':''} />
      {/* <Car color='red' className={ 'dash car-left'} leftPosition='30%' /> */}
      {/* <Car color='blue' leftPosition='70%' /> */}
      <Car position='25vw'></Car>
      <Car position={'60vw'}></Car>
      {/* <CarCanva width={400} height={400} x={30} y={5}></CarCanva> */}
      {
        gameState==='null' &&
        <button className='button-start' onClick={handleStartClick}>Start</button>
      }
      <img className='gif-try' src={gameState === 'active'?backActive:backStart} alt="" />
    </div>
  );
};

export default Game;
