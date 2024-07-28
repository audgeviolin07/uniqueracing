import React, { useState, useEffect } from 'react';
// import Car from '../components/Car';
import './game.css';
import CarCanva from './carCanva';
interface carData {
  score :number;
  speed :number;
  bestLap : number;
  rank : number;
}
interface CarProps {
  className?: string;
  position?: string;
}

interface StatusProps {
  leftData: carData;
  rightData: carData;
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

const Status: React.FC<StatusProps> = ({ leftData, rightData}) => {
  return (
    <div className="status">
      <div className='flex-horizontal'>
        <span>Score: {leftData.score}</span>
        <span>Speed: {leftData.speed}</span>
      </div>
      <div className='flex-horizontal'>
        <span>Score: {rightData.score}</span>
        <span>Speed: {rightData.speed}</span>
      </div>
    </div>
  );
};



export const Game: React.FC = () => {
  const [leftCar, setLeftCar] = useState<carData>({score:0, speed:0, bestLap:0, rank:0});
  const [rightCar, setRightCar] = useState<carData>({score:0, speed:0, bestLap:0, rank:0});
  const [gameState, setGameState] = useState<'null'|'active'|'finished'>('null');

  const handleStartClick = () => {
    setGameState('active');
  };

  return (
    <div className='game flex-vertical'>
      <Status leftData={leftCar} rightData={rightCar}/>
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
