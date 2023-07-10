// 1. Хнаходимо кнопки в розмітці HTML
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

// 2. Вішаємо слухачі подій на кнопки з реакцією на клік
btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);

// 3. Копіюємо надану функцію для створення випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// 4. Оголошуємо глобвльну змінну для видимості у всіх обробниках
let intervalColorChange;
btnStop.disabled = true;

// 5. Обробник кнопки Start
function handlerStart() {
  // 5.1 Робимо кнопку неактивною (оскільки обробник реагувуатиме на клік, то після кліку Старт стане неактивним)
  btnStart.disabled = true;
  btnStop.disabled = false;
  // 5.2 Змінюємо колір фону з інтервалом в 1 секунду = 1000 млсек
  intervalColorChange = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// 6. Обробник Стоп
function handlerStop() {
  // 6.1 Прибираємо інтервал, а отже зупиняємо зміну кольорів
  clearInterval(intervalColorChange);
  // 6.2 Робимо кнопку старт знову активною
  btnStart.disabled = false;
  btnStop.disabled = true;
}

