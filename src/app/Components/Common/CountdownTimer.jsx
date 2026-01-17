'use client';

import { useState, useEffect } from 'react';

const CountdownTimer = ({ endDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <div className={`flex items-center justify-center space-x-1 sm:space-x-2 ${className}`}>
      <div className="text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-1 sm:px-2 py-1 min-w-[32px] sm:min-w-[40px]">
          <span className="text-sm sm:text-lg font-bold">{formatNumber(timeLeft.days)}</span>
        </div>
        <span className="text-xs opacity-80 mt-1 block">Days</span>
      </div>
      <span className="text-sm sm:text-lg font-bold">:</span>
      <div className="text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-1 sm:px-2 py-1 min-w-[32px] sm:min-w-[40px]">
          <span className="text-sm sm:text-lg font-bold">{formatNumber(timeLeft.hours)}</span>
        </div>
        <span className="text-xs opacity-80 mt-1 block">Hours</span>
      </div>
      <span className="text-sm sm:text-lg font-bold">:</span>
      <div className="text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-1 sm:px-2 py-1 min-w-[32px] sm:min-w-[40px]">
          <span className="text-sm sm:text-lg font-bold">{formatNumber(timeLeft.minutes)}</span>
        </div>
        <span className="text-xs opacity-80 mt-1 block">Mins</span>
      </div>
      <span className="text-sm sm:text-lg font-bold">:</span>
      <div className="text-center">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-1 sm:px-2 py-1 min-w-[32px] sm:min-w-[40px]">
          <span className="text-sm sm:text-lg font-bold">{formatNumber(timeLeft.seconds)}</span>
        </div>
        <span className="text-xs opacity-80 mt-1 block">Secs</span>
      </div>
    </div>
  );
};

export default CountdownTimer;