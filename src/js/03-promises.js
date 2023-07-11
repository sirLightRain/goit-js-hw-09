// Підключаємо бібілотеку Notiflix
import Notiflix from 'notiflix';

// Функція створення промісів
function createPromise(position, delay) {
  // Повертає проміс
  return new Promise((resolve, reject) => {
    // Умова квиконання чи відхилення промісу
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Знаходимо форму за класрм
const form = document.querySelector('.form');
// Додаємо слухача подій на сабміт по наисканню кнопки
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInp = document.querySelector('input[name="delay"]');
  const stepInp = document.querySelector('input[name="step"]');
  const amountInp = document.querySelector('input[name="amount"]');

  const firstDelay = parseInt(delayInp.value);
  const step = parseInt(stepInp.value);
  const amount = parseInt(amountInp.value);

  // Цикл, що виводить повідомлення про проміси amount разів
  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const delay = firstDelay + i * step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  form.reset();
});
