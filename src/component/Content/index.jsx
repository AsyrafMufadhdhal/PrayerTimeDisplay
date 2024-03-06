import { useState, useEffect, useRef, useContext } from "react";
import { checkNext, filterData } from "../../utils/filterData";
import { startTimer } from "../../utils/getCount";
import { alertTimer } from "../../utils/getSound";
import { FinishContext, NextContext } from "../../utils/getContext";

import AzanIqomah from "../AzanIqomah";
import Container from "../Container";
import TimePin from "../TimePin";
import Message from "../Message";
import beep from "../../assets/sound/beep.mp3";
import alarm from "../../assets/sound/alarm.mp3";
import beeep from "../../assets/sound/beeep.mp3";

const Content = ({ prayerTimeList }) => {
  const prayerTimes = filterData(prayerTimeList);

  const { next, setNext } = useContext(NextContext);
  const { isFinished, setIsFinished } = useContext(FinishContext);

  const [azan, setAzan] = useState(false);
  const [iqomah, setIqomah] = useState(false);
  const [khutbah, setKhutbah] = useState(false);
  const [info, setInfo] = useState(false);
  const [iqomahTimer, setIqomahTimer] = useState(" ");

  const Ref = useRef(null);

  const Sound1 = new Audio(beep);
  const Sound2 = new Audio(alarm);
  const Sound3 = new Audio(beeep);

  let timeName = String(Object.keys(next));
  let timeValue = String(Object.values(next));

  let currentHrMin = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
  let day = new Date().toLocaleString("id-ID", { weekday: "long" }).toLowerCase();

  const clearTimer = (e) => {
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      setIqomahTimer(startTimer(e));
    }, 1000);
    Ref.current = id;
  };

  const getTimeLimit = (e) => {
    let startIqomah = new Date();
    startIqomah.setMinutes(startIqomah.getMinutes() + e);
    startIqomah.setSeconds(0);
    return startIqomah;
  };

  const notAzan = () => {
    alertTimer(Sound3);

    setNext(checkNext(prayerTimes, currentHrMin));
    setIsFinished(false);
  };

  const withAzan = () => {
    setAzan(true);
    alertTimer(Sound1);
    setTimeout(() => {
      setAzan(false);
      if (timeName == "dzuhur" && day == "jumat") {
        setKhutbah(true);
        clearTimer(getTimeLimit(33));
      } else {
        setIqomah(true);
        timeName == "maghrib" ? clearTimer(getTimeLimit(6)) : clearTimer(getTimeLimit(12));
      }
    }, 60000);
  };

  useEffect(() => {
    if (isFinished == true) {
      if (timeName == "imsak" || timeName == "terbit" || timeName == "dhuha") {
        notAzan();
      } else {
        withAzan();
      }
    }
  }, [isFinished]);

  useEffect(() => {
    if (iqomahTimer == "00 : 00") {
      if (khutbah) {
        setKhutbah(false);
        setNext(checkNext(prayerTimes, currentHrMin));
        setIsFinished(false);
      } else {
        alertTimer(Sound2);
        setTimeout(() => {
          setIqomah(false);
          setInfo(true);
        }, 5000);
      }
    }
  }, [iqomahTimer]);

  useEffect(() => {
    const getInfo = setTimeout(() => {
      setInfo(false);
    }, 60000);
    setIsFinished(false);
    setNext(checkNext(prayerTimes, currentHrMin));
    return () => {
      clearTimeout(getInfo);
    };
  }, [info]);

  const showContent = () => {
    if (azan == true) {
      return <AzanIqomah title="A D Z A N" onTime={`${timeName} - ${timeValue}`} />;
    } else if (iqomah == true) {
      return <AzanIqomah title="I Q O M A H" iqomahTimer={iqomahTimer} />;
    } else if (khutbah == true) {
      return <AzanIqomah title="KHUTBAH" />;
    } else if (info == true) {
      return <Message />;
    } else if (iqomahTimer == undefined || iqomahTimer == " ") {
      return <TimePin prayerTimes={prayerTimes} next={timeName} />;
    }
  };

  return (
    <>
      <Container>{showContent()}</Container>
    </>
  );
};

export default Content;
