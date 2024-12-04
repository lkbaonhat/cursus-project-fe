import React, { useState, useEffect } from "react";

interface CountDownProps {
  initialTime: number;
  onTimeUp: () => void;
}

const CountDown: React.FC<CountDownProps> = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return <div>{formatTime(timeLeft)}</div>;
};

export default CountDown;
