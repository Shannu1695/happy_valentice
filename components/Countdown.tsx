
import React, { useState, useEffect } from 'react';
import { TimeLeft } from '../types';

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const nextVDay = new Date();
    nextVDay.setFullYear(nextVDay.getFullYear() + (nextVDay.getMonth() > 1 || (nextVDay.getMonth() === 1 && nextVDay.getDate() >= 14) ? 1 : 0));
    nextVDay.setMonth(1); // February
    nextVDay.setDate(14);
    nextVDay.setHours(0, 0, 0, 0);

    const difference = +nextVDay - +new Date();
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-white relative z-10 text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
      
      <h2 className="text-3xl font-cute text-pink-500 mb-8 relative">Counting down to our next Valentine's...</h2>
      
      <div className="flex flex-wrap justify-center gap-4 md:gap-8 relative">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="bg-pink-500 text-white w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg mb-2">
              {item.value.toString().padStart(2, '0')}
            </div>
            <span className="text-gray-500 uppercase tracking-widest text-sm font-semibold">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Countdown;
