import "./styles.css";

// You're gonna need this
const title = document.createElement("h1");
const time = document.createElement("h3");

title.innerHTML = "Time Util Christmas";

document.body.appendChild(title);
document.body.appendChild(time);

const NINE_HOURS_MILLISECONDS = 32400000;

const MILLISECONDS = [86400000, 3600000, 60000, 1000]; // day, hour, minute, seconds

function remainderTime(remainder, i) {
  return parseInt(remainder / MILLISECONDS[i], 10);
}

function getTime() {
  // Don't delete this.
  const xmasDay = new Date("2020-12-24:00:00:00+0900");
  let nowDay = new Date();

  const timeOffSet = nowDay.getTimezoneOffset(); // locale과의 시간 차 (분) , -540
  const timeOffSetHours = timeOffSet / 60; // -9

  const KST = timeOffSetHours * MILLISECONDS[1] + NINE_HOURS_MILLISECONDS;
  nowDay = nowDay.getTime() + KST;
  let remainder = xmasDay.getTime() - nowDay;

  const day = remainderTime(remainder, 0);
  remainder = remainder % MILLISECONDS[0];

  const hours = remainderTime(remainder, 1);
  remainder = remainder % MILLISECONDS[1];

  const minute = remainderTime(remainder, 2);
  remainder = remainder % MILLISECONDS[2];

  const seconds = remainderTime(remainder, 3);

  time.innerHTML = `${day}d ${hours < 10 ? `0${hours}` : hours}h 
  ${minute < 10 ? `0${minute}` : minute}m ${
    seconds < 10 ? `0${seconds}` : seconds
  }s`;
}

function init() {
  setInterval(getTime, 1000);
}
init();
