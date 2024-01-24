import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formPromises = document.querySelector('.form');

// ? надо ли эти 4 строки указывать или можно добраться через форму? and vise verse?
// const inputDelayEL = document.querySelector('[delay]');
// const inputFulfilledEL = document.querySelector('[fulfilled]'); 
// const inputRejectedEL = document.querySelector('[rejected]'); 
// const submitBtnEL = document.querySelector('[submit]');

formPromises.addEventListener('submit', promiseNotifications);

function promiseNotifications(evt) {
  evt.preventDefault();

  const delay = parseInt(this.elements.delay.value); //? пробывал достучать через form.elements.delay.value нифига не получилось =()
  const state = this.elements.state.value; //? и почему я не смог эти переменные сделать глобальными? вне function promiseNotifications(evt)

  const promiseFulfilledRejected = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promiseFulfilledRejected
    .then(delay => {
      iziToast.show({
        title: `✅ Fulfilled promise in ${delay}`,
        titleColor: '#FFFFFF',
        message: `ms`, // not the best library, problem with text position (it's located upper that it should be)
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#59A10D',
        position: 'topRight',
        animateInside: true,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: true,
        progressBarColor: 'white',
        progressBarEasing: 'linear',
        transitionIn: 'fadeInUp',
        transitionOut: 'fadeOut',
        transitionInMobile: 'fadeInUp',
        transitionOutMobile: 'fadeOutDown',
      });
      console.log("Who is a daddy now?!)))");
    })
    .catch(delay => {
      iziToast.show({
        title: `❌Rejected promise in ${delay}`,
        titleColor: '#FFFFFF',
        message: `ms`,
        messageColor: '#FFFFFF',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#EF4040',
        color: 'blue',
        position: 'topRight',
        animateInside: true,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: true,
        progressBarColor: 'white',
        progressBarEasing: 'linear',
        transitionIn: 'fadeInUp',
        transitionOut: 'fadeOut',
        transitionInMobile: 'fadeInUp',
        transitionOutMobile: 'fadeOutDown',
      });

    });
}
