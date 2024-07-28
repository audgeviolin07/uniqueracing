import React, { useState, useEffect } from 'react';
import './game.css';

interface CarProps {
  className: string;
  position: number;
}

interface StatusProps {
  score: number;
  speed: number;
}

const Road: React.FC = () => {
  return (
    <div className="road-container">
      <div className="road">
        <div className="road-strip"></div>
        <div className="road-strip"></div>
        <div className="road-strip"></div>
        <div className="road-strip"></div>
        <div className="road-strip"></div>
        <div className="road-strip"></div>
        <div className="start-line"></div>
      </div>
      <div className="road-border left-border"></div>
      <div className="road-border right-border"></div>
    </div>
  );
};

const Car: React.FC<CarProps> = ({ className, position }) => {
  return <div className={`car ${className}`} style={{ left: `${position}%` }}></div>;
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
  const [leftCarPosition, setLeftCarPosition] = useState<number>(40); // Adjusted for percentage
  const [rightCarPosition, setRightCarPosition] = useState<number>(60); // Adjusted for percentage

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => prev + 1);
      setSpeed((prev) => Math.min(prev + 1, 100)); // Max speed 100 mph
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStartClick = () => {
    setSpeed(50); // Initial speed
  };

  return (
    <div>
      <Status score={score} speed={speed} />
      <Road />
      <Car className="red" position={leftCarPosition} />
      <Car className="blue" position={rightCarPosition} />
      <button onClick={handleStartClick}>Start</button>
    </div>
  );
};

export default Game;
