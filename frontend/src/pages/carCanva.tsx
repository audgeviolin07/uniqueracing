import React, { useRef, useEffect } from 'react';

interface CarProps {
  width: number;
  height: number;
  x: number;
  y: number;
}

const CarCanva: React.FC<CarProps> = ({ width, height, x, y }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear   the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the F1 car from the back
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        // Main body
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(100, 70); // Moved up slightly
        ctx.lineTo(150, 120);
        ctx.quadraticCurveTo(130, 140, 100, 140);
        ctx.quadraticCurveTo(70, 140, 50, 120);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rear wing
        ctx.beginPath();
        ctx.moveTo(50, 120);
        ctx.lineTo(50, 140);
        ctx.lineTo(150, 140);
        ctx.lineTo(150, 120);
        ctx.closePath();
        ctx.stroke();

        // Rear tires
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(35 + 15, 140 + 25, 15, 0, 2 * Math.PI);
        ctx.arc(135 + 15, 140 + 25, 15, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Front tires
        ctx.beginPath();
        ctx.arc(20 + 15, 180 + 25, 15, 0, 2 * Math.PI);
        ctx.arc(150 + 15, 180 + 25, 15, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rear suspension
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(50, 140);
        ctx.lineTo(70, 170);
        ctx.quadraticCurveTo(90, 180, 110, 170);
        ctx.lineTo(130, 170);
        ctx.quadraticCurveTo(150, 180, 150, 140);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Exhaust
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(90, 150);
        ctx.lineTo(110, 150);
        ctx.lineTo(110, 160);
        ctx.lineTo(90, 160);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Engine cover
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(90, 70);
        ctx.lineTo(110, 70);
        ctx.lineTo(110, 120);
        ctx.lineTo(90, 120);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rear wing supports
        ctx.beginPath();
        ctx.moveTo(70, 140);
        ctx.lineTo(90, 120);
        ctx.moveTo(130, 140);
        ctx.lineTo(110, 120);
        ctx.stroke();

        // Top trapezoid-like shape
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(100, 70);
        ctx.lineTo(120, 50);
        ctx.lineTo(80, 50);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }, [width, height]);

  return <canvas className='car' ref={canvasRef} width={width} height={height} />;
};

export default CarCanva;