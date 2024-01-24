import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const dayTimeInputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;
dayTimeInputEl.disabled = false;

let userSelectedDate = null;

let intervalId = null;

iziToast.settings({
  timeout: 3000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: 'black',
        backgroundColor: '#e97f77',
        position: 'topRight',
        icon: 'ico-error',
      });
      btnStartEl.disabled = true;
    //   dayTimeInputEl.disabled = false;
      return;
    }
    btnStartEl.disabled = false;
    dayTimeInputEl.disabled = false;

    const startTimer = () => {
      const currentDate = new Date();
      userSelectedDate = selectedDates[0];

      if (!userSelectedDate) return;

      const timeDifference = userSelectedDate - currentDate;

      const {days, hours, minutes, seconds } = convertMs(timeDifference);

      dataDaysEl.textContent = addPad(days);
      dataHoursEl.textContent = addPad(hours);
      dataMinutesEl.textContent = addPad(minutes);
      dataSecondsEl.textContent = addPad(seconds);

      if (
        dataDaysEl.textContent === '00' &&
        dataHoursEl.textContent === '00' &&
        dataMinutesEl.textContent === '00' &&
        dataSecondsEl.textContent === '00'
      ) {
        clearInterval(intervalId);
      }
    };
    startTimer();

    const startInterval = () => {
      intervalId = setInterval(startTimer, 1000);
      btnStartEl.disabled = true;
      dayTimeInputEl.disabled = true;
    };

    btnStartEl.addEventListener('click', startInterval);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addPad(value) {
  return String(value).padStart(2, '0');
}

flatpickr('#datetime-picker', options);
