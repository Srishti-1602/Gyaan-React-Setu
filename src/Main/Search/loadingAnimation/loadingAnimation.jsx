import React, { useState, useEffect } from 'react';
import './loadingAnimation.css'

const LoadingBar = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prevPercentage) => {
        if (prevPercentage >= 100) {
          clearInterval(interval);
          return prevPercentage;
        }

        const randomIncrement = Math.floor(Math.random() * 10) + 1;
        const nextPercentage = prevPercentage + randomIncrement;
        return nextPercentage > 100 ? 100 : nextPercentage;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length === 3) {
          return '';
        }
        return prevDots + '.';
      });
    }, 500); // Interval to add dots every 0.5 seconds

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="loading-bar">
      <div className="progress" style={{ width: `${loadingPercentage}%` }}>
        {loadingPercentage < 100 ? 'Generating results' + dots : 'Results generated!'}
      </div>
    </div>
  );
};

export default LoadingBar;
