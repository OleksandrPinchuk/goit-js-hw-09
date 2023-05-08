import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix';

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

let selectedTime = null;
let timerId = null;

refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            Notify.failure('Please choose a date in the future');
            refs.startBtn.disabled = true;
        } else {
            refs.startBtn.disabled = false;
            selectedTime = selectedDates[0];
        }
    },
};

flatpickr("input#datetime-picker", options);

const timer = {
    start() {
        timerId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            updateTimerface({ days, hours, minutes, seconds });

            if (deltaTime < 1000) {
                timer.stop();
                return;
            };
        }, 1000);
        
        refs.startBtn.disabled = true;
    },

    stop() {
        clearInterval(timerId);
    },
};

refs.startBtn.addEventListener("click", timer.start);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function updateTimerface({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
};

// *-----------------------------------------------------------

// const refs = {
//     startBtn: document.querySelector('button[data-start]'),
//     days: document.querySelector('span[data-days]'),
//     hours: document.querySelector('span[data-hours]'),
//     minutes: document.querySelector('span[data-minutes]'),
//     seconds: document.querySelector('span[data-seconds]'),
// };

// let selectedTime = null;

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//         if (selectedDates[0] < options.defaultDate) {
//             Notify.failure('Please choose a date in the future');
//             refs.startBtn.disabled = true;
//         } else {
//             refs.startBtn.disabled = false;
//             selectedTime = selectedDates[0];
//         }
//     },
// };
// flatpickr("input#datetime-picker", options);

// class Timer {
//     constructor({ onTick }){
//         this.timerId = null;
//         refs.startBtn.disabled = true;
//         // this.selectedTime = selectedTime;
//         this.onTick = onTick;

//         // this.isActive = false;
//     }

//     // init() {
//     // const time = this.convertMs(0);
//     // this.onTick(time);
//     // }

//     start() {
//         // if (this.isActive) {
//         //     return;
//         // }
        
//     // this.isActive = true;
    
    
//         this.timerId = setInterval(() => {
//             const currentTime = Date.now();
//             const deltaTime = selectedTime - currentTime;
//             const { days, hours, minutes, seconds } = this.getTimeComponents(deltaTime);


//             this.onTick({ days, hours, minutes, seconds });

//             if (deltaTime < 1000) {
//                 this.stop();
//                 return;
//             };
//         }, 1000);

//         refs.startBtn.disabled = true;
//     }

//     stop() {
//         clearInterval(this.timerId);
//         this.isActive = false;
//     }

//     getTimeComponents(ms) {
//         const second = 1000;
//         const minute = second * 60;
//         const hour = minute * 60;
//         const day = hour * 24;

//         const days = this.addLeadingZero(Math.floor(ms / day));
//         const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
//         const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//         const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//         return { days, hours, minutes, seconds };
//     }

//     addLeadingZero(value) {
//         return String(value).padStart(2, '0');
//     }
// };

// const timer = new Timer({
//     onTick: updateTimerface,
// });

// refs.startBtn.addEventListener("click", timer.start);

// function updateTimerface({ days, hours, minutes, seconds }) {
//     refs.days.textContent = `${days}`;
//     refs.hours.textContent = `${hours}`;
//     refs.minutes.textContent = `${minutes}`;
//     refs.seconds.textContent = `${seconds}`;
// };
