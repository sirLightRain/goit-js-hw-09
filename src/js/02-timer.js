// Підключення бібліотеки flatpickr за описом в окументації
import flatpickr from 'flatpickr';
// Додаткове підключення стилів бібліотеки за підказкою в завданні
import 'flatpickr/dist/flatpickr.min.css';
// Підключення біблотеки Notiflix для заміни стандартного alert-повідомлення
import Notiflix from 'notiflix';

// Знаходимо кнопку Start
const startButton = document.querySelector('button[data-start]');
// Робимо кнопку Start неактивною, аж до моменту обрання коректної дати
startButton.disabled = true;

// Використовуємо запропонований у завданні об'єкт з доповненнями, котрий потім використовуєтсья другим параметром при ініціалізації календаря з допомогою бібліотеки flatpickr.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Метод onClose() з об'єкта параметрів викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr. Саме у ньому варто обробляти дату, обрану користувачем.
  onClose(selectedDates) {
    // selectedDates - це масив обраних дат, тому ми беремо перший елемент
    const selectedDate = selectedDates[0];
    // Створюємо змінну, куди буде фіксуватися обрана дата
    const currentDate = new Date();

    // Перевірка дати. Ми обрали її в майбтньому чи в минулому?
    if (selectedDate <= currentDate) {
      // Використання бібліотеки Notiflix для заміни стандартного alert-повідомлення. Якщо обрали минуле - виведе вікно попередження з помилкою.
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.addEventListener('click', startTimer);
      startButton.disabled = false;
    }
  },
};

// Ініціалізуємо календар з бібліотеки flatpickr
const flatpick = flatpickr('#datetime-picker', options);

// Запропонована у завданні ункція обчислення часу.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція икористовує метод padStart() і перед рендерингом інтефрейсу форматує значення, додаючи 0 попереду значення, якщо маємо показник з 1-єї цифри. Наприклад залишилося 4 дні, треба, щоб вивело 04.
function zeroBeginning(value) {
  return String(value).padStart(2, '0');
}

// Функція таймера
function startTimer() {
  // Коли таймер розпочався, кнопка старт стає неактивною, що унеможливить її повторне натискання.
  startButton.disabled = true;
  // Знаходимо всі елементи з класом value в середині елемента з класом timer
  const timerFields = document.querySelectorAll('.timer .value');
  // Для першого обраного елементу у календарі з допомогою бібліотеки flatpickr отримуэмо значення дати, часу і перетворюємо на мілі-секунди
  const endDate = flatpick.selectedDates[0].getTime();

  // Функція оновлення таймера
  function updateTimer() {
    // Отримуємо значення поточної дати в мілісекундах
    const currentDate = new Date().getTime();
    // Різниця часу в мілісекундах між поточним і обраним
    const remainingTime = endDate - currentDate;

    // Якщо час вичерпано (наступила обрана нами дата)
    if (remainingTime <= 0) {
      // Очищаємо інтервал таймера, отже зупинямо виконання функції updateTimer
      clearInterval(timerInterval);
      // Після обнулення таймера встановлюємо "00" у полях виводу днів, годин, тощо.
      timerFields.forEach(field => (field.textContent = '00'));
      return;
    }

    // Передаємо залишок часу на опрацювання функції convertMs
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    // Заповнюємо поля виводу значеннями
    timerFields[0].textContent = zeroBeginning(days);
    timerFields[1].textContent = zeroBeginning(hours);
    timerFields[2].textContent = zeroBeginning(minutes);
    timerFields[3].textContent = zeroBeginning(seconds);
  }

  // timerInterval містить результат роботи функції updateTimer і викликається повторно кожну секунду
  const timerInterval = setInterval(updateTimer, 1000);
}
