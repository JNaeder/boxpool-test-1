import { useState, useEffect } from "react";

type TimeLeft = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  message?: string;
};

export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  // const [timeDifference, setTimeDifference] = useState<number>(999);
  const calcTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return { message: "Starting Soon" };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft());

  useEffect(() => {
    setTimeLeft(calcTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <>
      {timeLeft.message ? (
        <>
          <div>{timeLeft.message}</div>
        </>
      ) : (
        <>
          <div>
            <span>Starts in: </span>
            <span>{timeLeft.days}d </span>
            <span>{timeLeft.hours}h </span>
            <span>{timeLeft.minutes}m </span>
            <span>{timeLeft.seconds}s</span>
          </div>
        </>
      )}
    </>
  );
}
