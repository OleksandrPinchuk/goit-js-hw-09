const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');

startBtnEl.addEventListener(`click`, onStartBtnClick);
stopBtnEl.addEventListener(`click`, onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

let timerId = null;

function onStartBtnClick() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtnEl.disabled = true;
    stopBtnEl.disabled = false;
};

function onStopBtnClick() {
    clearInterval(timerId);
    startBtnEl.disabled = false;
    stopBtnEl.disabled = true;
};