import { useState, useEffect, useRef, useContext } from "react";
import { FinishContext, NextContext } from "../../utils/getContext";
import { startTimer } from "../../utils/getCount";

const Countdown = () => {
  const Ref = useRef(null);

  const { setIsFinished } = useContext(FinishContext);
  const { next } = useContext(NextContext);

  const [timer, setTimer] = useState(" ");

  let now = String(Object.keys(next));
  let hr = parseInt(String(Object.values(next)).slice(0, 2));
  let min = parseInt(String(Object.values(next)).slice(3, 5));

  const clearTimer = (e) => {
    // countdown timer for next prayer time
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      setTimer(startTimer(e));
    }, 1000);
    Ref.current = id;
  };

  // set countdown limit
  const getTimeLimit = () => {
    let nextPray = new Date();
    if (now === "imsak") {
      nextPray.setDate(nextPray.getDate() + 1);
    }
    nextPray.setHours(hr);
    nextPray.setMinutes(min);
    nextPray.setSeconds(0);
    return nextPray;
  };

  useEffect(() => {
    clearTimer(getTimeLimit());
  }, [hr, min]);

  // when countdown end, set finished status to true
  useEffect(() => {
    if (timer == "00 : 00") {
      setIsFinished(true);
    }
  }, [timer]);

  return <>{timer}</>;
};

export default Countdown;
