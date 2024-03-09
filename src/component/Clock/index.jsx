import { useEffect, useState } from "react";

const Clock = () => {
  let currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
  const [time, setTime] = useState(currentTime);

  // Code for realtime clock
  useEffect(() => {
    const updateTime = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", { hour12: false })), 1000);

    //in midnight refresh page to load new data
    if (time == "00:00:00" || time == "24:00:00") {
      console.log("halaman di reload");
      window.location.reload();
    }
    return () => clearInterval(updateTime);
  }, [time]);
  return <>{time}</>;
};

export default Clock;
