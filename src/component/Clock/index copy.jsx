import styles from "../Clock/Clock.module.css";
import { useEffect, useState } from "react";

const Clock = () => {
  let currentTime = new Date().toLocaleTimeString("en-US", { hour12: false });
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const updateTime = setInterval(() => setTime(new Date().toLocaleTimeString("en-US", { hour12: false })), 1000);
    return () => clearInterval(updateTime);
  }, [time]);
  return (
    <>
      <div className="col-3 text-center">
        <span className="fw-bold p-0 m-0" id={styles.time}>
          {time}
        </span>
      </div>
      <div className="col-auto text-center align-self-center" id={styles.timeArea}>
        <span className="m-0 fw-medium"> WIB</span>
      </div>
    </>
  );
};

export default Clock;
