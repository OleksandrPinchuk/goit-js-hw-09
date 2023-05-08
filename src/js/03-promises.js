import { Notify } from 'notiflix';

const refs = {
  form: document.querySelector(`.form`),
  delay: document.querySelector(`input[name="delay"]`),
  step:document.querySelector(`input[name="step"]`),
  amount: document.querySelector(`input[name="amount"]`),
};

refs.form.addEventListener('submit', onBtnCreate);

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
};

function onBtnCreate(event) {
  event.preventDefault();

  const firstDelay = Number(refs.delay.value);
  const delayStep = Number(refs.step.value);

  for (let i = 0; i < refs.amount.value; i++) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  };
};
