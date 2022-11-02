import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.addEventListener('click', startCountDownTimer);
refs.button.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      refs.button.disabled = false;
    }
  },
};

const flatpickrLib = flatpickr(refs.input, options);

let timerId = null;

function getTimeFeature() {
  return flatpickrLib.selectedDates[0].getTime();
}

function startCountDownTimer() {
  refs.button.disabled = true;
  timerId = setInterval(() => {
    const countDown = getTimeFeature() - Date.now();
    const timeComponents = convertMs(countDown);
    updateClockFace(timeComponents);
    if (countDown <= 1000) {
      clearInterval(timerId);
      refs.button.disabled = false;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ seconds, minutes, hours, days }) {
  refs.seconds.textContent = `${seconds}`;
  refs.minutes.textContent = `${minutes}`;
  refs.hours.textContent = `${hours}`;
  refs.days.textContent = `${days}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
