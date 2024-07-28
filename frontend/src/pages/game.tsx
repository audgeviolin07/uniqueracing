import React, { useState, useEffect } from 'react';
import './game.css';

interface carData {
  score: number;
  speed: number;
  bestLap: number;
  rank: number;
  distance: number;
  acceleration: number;
}

interface CarProps {
  className?: string;
  position?: string;
}

interface StatusProps {
  leftData: carData;
  rightData: carData;
  time: number;
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
      className={`road-strip ${classes}`}
      style={{ top: `${i * 40 + 2}%` }}
    ></div>
  ));
  return (
    <div className="road-container">
      <div className="road">
        {stripes}
      </div>
      <div className={`road-border left-border ${classes !== '' ? 'border-animate' : ''}`}></div>
      <div className={`road-border right-border ${classes !== '' ? 'border-animate' : ''}`}></div>
    </div>
  );
};

const Car: React.FC<CarProps> = ({ className = '', position }) => {
  const leftPosition = position === 'left' ? '25vw' : '60vw';

  return (
    <div className={`car flex-vertical ${className}`} style={{ left: `${leftPosition}` }}>
      <div className={`flex-horizontal front-section-${position}`}>
        <div className='wheel front left'></div>
        <div className='car-front'></div>
        <div className='wheel front right'></div>
      </div>
      <div className={`chasis-${position}`}>
        <div className={`chasis-${position} inner-${position}`}></div>
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

const Status: React.FC<StatusProps> = ({ leftData, rightData, time }) => {
  return (
    <div className="status">
      <div className='flex-horizontal'>
        <span>Score: {leftData.score.toFixed(4)}</span><br />
        <span>Speed: {leftData.speed.toFixed(2)} km/h</span><br />
        <span>Distance: {leftData.distance.toFixed(2)} km</span>
      </div>
      <div className='flex-horizontal'>
        <span>Time: {time.toFixed(4)}s</span>
      </div>
      <div className='flex-horizontal'>
        <span>Score: {rightData.score.toFixed(4)}</span><br />
        <span>Speed: {rightData.speed.toFixed(2)} km/h</span><br />
        <span>Distance: {rightData.distance.toFixed(2)} km</span>
      </div>
    </div>
  );
};

const texts: [string, string][] = [
  [
    "Rainy Weather Forecast",
    "With heavy rain expected to hit the track just before the race starts, teams are already preparing for the wet conditions. Drivers will need to adapt quickly to the slippery surface, and pit crews are getting ready with wet-weather tires."
  ],
  [
    "Tire Degradation Concerns",
    "Teams are worried about the high tire degradation rates observed during practice sessions. The abrasive track surface is expected to wear down the tires rapidly, forcing teams to reconsider their tire strategies before the race begins."
  ],
  ['',''],['',''],
  [
    "Unpredictable Wind Gusts",
    "Strong, unpredictable wind gusts are forecasted for the day of the race, which could impact car stability and aerodynamics. Engineers are working on adjustments to ensure that the cars can handle these challenging wind conditions."
  ],
  ['',''],
  ['',''],
  [
    "Pit Lane Technical Issues",
    "Technical issues in the pit lane have been reported, with some teams experiencing malfunctions in their fueling and tire-changing equipment. This could cause delays and strategic headaches if not resolved before the race starts."
  ],
  ['','']
];

interface MessageProps {
  message: string;
}

const ShowMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className='message flex-vertical'>
      {message}
    </div>
  );
};

const acc_left = 2.0;
const acc_right = 2.0;

export const Game: React.FC = () => {
  const [leftCar, setLeftCar] = useState<carData>({ score: 0, speed: 0, bestLap: 0, rank: 0, distance: 0, acceleration: 0 });
  const [rightCar, setRightCar] = useState<carData>({ score: 0, speed: 0, bestLap: 0, rank: 0, distance: 0, acceleration: 0 });
  const [time, setTime] = useState<number>(0);
  const [gameState, setGameState] = useState<'null' | 'active' | 'finished'>('null');
  const [winner, setWinner] = useState<string | null>(null);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    if (gameState === 'active') {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 0.2);
        setLeftCar(prevLeftCar => {
          const newSpeed = prevLeftCar.speed + prevLeftCar.acceleration * 0.2;
          const newDistance = prevLeftCar.distance + (newSpeed + prevLeftCar.speed) / 36000;
          const newScore = 0.1 * newDistance;
          return { ...prevLeftCar, score: newScore, speed: newSpeed, distance: newDistance };
        });
        setRightCar(prevRightCar => {
          const newSpeed = prevRightCar.speed + prevRightCar.acceleration * 0.2;
          const newDistance = prevRightCar.distance + (newSpeed + prevRightCar.speed) / 36000;
          const newScore = 0.1 * newDistance;
          return { ...prevRightCar, score: newScore, speed: newSpeed, distance: newDistance };
        });
        if (Number.isInteger(time)){
          setLeftCar(prev => { return { ...prev, acceleration: prev.acceleration + (Math.random()-0.5)*0.8 } });
          setRightCar(prev => { return { ...prev, acceleration: prev.acceleration + (Math.random()-0.5)*0.8 } });
        }

        if (Math.max(leftCar.distance, rightCar.distance) >= 0.02) {
          setGameState('finished');
          if (leftCar.distance > rightCar.distance) {
            setWinner("Player1 Won the Game");
          } else if (leftCar.distance < rightCar.distance) {
            setWinner("Player2 Won the Game");
          } else {
            setWinner("Game Draw");
          }
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [gameState, leftCar.distance, rightCar.distance]);

  useEffect(() => {
    if (gameState === 'active') {
      const interval = setInterval(() => {
        setCurrentMessage(getRandomMessage());
      }, 2000); // Change message every 2 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [gameState]);

  const handleStartClick = () => {
    setGameState('active');
    setLeftCar(prev => { return { ...prev, acceleration: acc_left } });
    setRightCar(prev => { return { ...prev, acceleration: acc_right } });
  };
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    const [title, message] = texts[randomIndex];
    if (title===''){
      return '';
    }
    return `${title}: ${message}`;
  };

  return (
    <div className='game flex-vertical'>
      <Status leftData={leftCar} rightData={rightCar} time={time} />
      <Road classes={gameState === 'active' ? 'strip-animate' : ''} />
      <Car position='left'></Car>
      <Car position='right'></Car>
      {gameState === 'null' && <button className='button-start' onClick={handleStartClick}>Start</button>}
      <img className='gif-try' src={gameState === 'active' ? backActive : backStart} alt="" />
      {winner && <ShowMessage message={winner} />}
      {gameState === 'active' && currentMessage !== ''  && <ShowMessage message={currentMessage} />}
    </div>
  );
};

export default Game;
