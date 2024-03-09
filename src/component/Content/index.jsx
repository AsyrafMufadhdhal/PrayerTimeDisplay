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
    // Iqomah TIMER
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      setIqomahTimer(startTimer(e));
    }, 1000);
    Ref.current = id;
  };

  // SET IQOMAH TIMER LIMIT
  const getTimeLimit = (e) => {
    let startIqomah = new Date();
    startIqomah.setMinutes(startIqomah.getMinutes() + e);
    startIqomah.setSeconds(0);
    return startIqomah;
  };

  // For Imsak, Syuruq and dhuha time just alert with sound
  const notAzan = () => {
    alertTimer(Sound3);
    setNext(checkNext(prayerTimes, currentHrMin));
    setIsFinished(false);
  };

  // For other daily prayer set alert with sound and azan/iqomah/khutbah information
  const withAzan = () => {
    setAzan(true); // set azan status to true when next prayer countdown finised
    alertTimer(Sound1);
    setTimeout(() => {
      // DEFINE PRAYER TIME TO DISPLAY IQOMAH/KHUTBAH AFTER AZAN INFORMATION DISPLAY FOR 1 MIN
      setAzan(false);
      if (timeName == "dzuhur" && day == "jumat") {
        //If Jum'at prayer, set azan without iqomah but khutbah information set to display for 33 min
        setKhutbah(true);
        clearTimer(getTimeLimit(33));
      } else {
        // If Maghrib prayer, set iqomah time limit to 6 min after azan, for others set 12 min
        setIqomah(true);
        timeName == "maghrib" ? clearTimer(getTimeLimit(6)) : clearTimer(getTimeLimit(12));
      }
    }, 60000);
  };

  useEffect(() => {
    // SET ALERT TYPE WHEN COUNTDOWN FOR NEXT PRAYER TIME IS FINISHED
    if (isFinished == true) {
      if (timeName == "imsak" || timeName == "terbit" || timeName == "dhuha") {
        notAzan();
      } else {
        withAzan();
      }
    }
  }, [isFinished]);

  // SET ACTION WHEN IQOMAH TIMER IS FINISHED
  useEffect(() => {
    if (iqomahTimer == "00 : 00") {
      // if jum'at prayer,
      if (khutbah) {
        setKhutbah(false); // set khutbah informaton to false
        setNext(checkNext(prayerTimes, currentHrMin)); // check for next time prayer for the next countdown
        setIsFinished(false); //set back finished status to false
      } else {
        // for other prayer time
        alertTimer(Sound2); //alert sound after iqomah timer end
        setTimeout(() => {
          setIqomah(false); // set false to display iqomah off
          setInfo(true); // set true to display information before starting sholat
        }, 5000);
      }
    }
  }, [iqomahTimer]);

  useEffect(() => {
    const getInfo = setTimeout(() => {
      setInfo(false); // set false to display information befor sholat off after 1 min
    }, 60000);
    setIsFinished(false); // set finish status to false to set new countdown for next prayer time
    setNext(checkNext(prayerTimes, currentHrMin)); //check next prayer time to count
    return () => {
      clearTimeout(getInfo);
    };
  }, [info]);

  const showContent = () => {
    if (azan == true) {
      return <AzanIqomah title="A D Z A N" onTime={`${timeName} - ${timeValue}`} />; // for azan display
    } else if (iqomah == true) {
      return <AzanIqomah title="I Q O M A H" iqomahTimer={iqomahTimer} />; // for iqomah display
    } else if (khutbah == true) {
      return <AzanIqomah title="KHUTBAH" />; // for khutbah display
    } else if (info == true) {
      return <Message />;
    } else if (iqomahTimer == undefined || iqomahTimer == " ") {
      return <TimePin prayerTimes={prayerTimes} next={timeName} />; // for display prayer time list
    }
  };

  return (
    <>
      <Container>{showContent()}</Container>
    </>
  );
};

export default Content;
