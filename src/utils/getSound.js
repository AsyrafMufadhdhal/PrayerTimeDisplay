import beep from "../assets/sound/beep.mp3";
import alarm from "../assets/sound/alarm.mp3";
import beeep from "../assets/sound/beeep.mp3";

const Sound1 = new Audio(beep);
const Sound2 = new Audio(alarm);
const Sound3 = new Audio(beeep);

export const alertTimer = (e) => {
  const start = setInterval(() => {
    e.currentTime = 0;
    e.play();
  }, 1000);

  setTimeout(() => {
    clearInterval(start);
  }, 3000);
};
