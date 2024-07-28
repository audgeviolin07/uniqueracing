// import React from 'react';
// import './Car.css';

// interface CarProps {
//   color: string;
//   className?: string;
//   leftPosition: string;
// }

// const Car: React.FC<CarProps> = ({ color, className, leftPosition }) => {
//   return (
//     <div className={`car ${className}`} style={{ backgroundColor: color, left: leftPosition }}>
//       <div className="body"></div>
//       <div className="front-wing"></div>
//       <div className="rear-wing"></div>
//       <div className="wheel left-wheel front-wheel"></div>
//       <div className="wheel right-wheel front-wheel"></div>
//       <div className="wheel left-wheel rear-wheel"></div>
//       <div className="wheel right-wheel rear-wheel"></div>
//     </div>
//   );
// };

// export default Car;
import React from 'react';
import './Car.css';

interface CarProps {
  color: string;
  className?: string;
  leftPosition:string;
}

const Car: React.FC<CarProps> = ({ color, className, leftPosition }) => {
  return (
    <div className={`car ${className}`} style={{ backgroundColor: color}}>
      <div className='roof'></div>
      <div className='hood' style={{ backgroundColor: color }}></div>
      <div className='trunk' style={{ backgroundColor: color }}></div>
      <div className='left-mirror' style={{ backgroundColor: color }}></div>
      <div className='right-mirror' style={{ backgroundColor: color }}></div>
      <div className='left-wheel front'></div>
      <div className='right-wheel front'></div>
      <div className='left-wheel back'></div>
      <div className='right-wheel back'></div>
    </div>
  );
};

export default Car;