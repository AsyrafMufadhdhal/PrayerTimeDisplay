import { useEffect, useState } from "react";

const Clock = () => {
  let currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const updateTime = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", { hour12: false })), 1000);
    return () => clearInterval(updateTime);
  }, [time]);
  return <>{time}</>;
};

export default Clock;
