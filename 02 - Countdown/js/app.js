const countdownElement = document.querySelector(".countdown");
const items = document.querySelectorAll(".countdown-item > h4");

// Назначаем дату отсчета
let countdownDate = new Date(2022, 11, 18, 10, 0, 0).getTime();

function getCountTime() {
  // Получаем текущее время
  const now = new Date().getTime();

  // Находим разницу времени
  const distance = countdownDate - now;

  // 1c = 1000мс
  // 1м = 60с
  // 1ч = 60м
  // 1д = 24ч

  // Создаем переменные в милисекундах
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // Подсчет для дней, часов, минут и секунд
  let days = Math.floor(distance / oneDay);
  let hours = Math.floor((distance % oneDay) / oneHour);
  let minutes = Math.floor((distance % oneHour) / oneMinute);
  let seconds = Math.floor((distance % oneMinute) / 1000);

  // Создаем массив для переменных
  const values = [days, hours, minutes, seconds];

  // Добавляем значения переменных на страницу
  items.forEach(function (item, index) {
    item.textContent = values[index];
  });

  // Если время истекло
  if (distance < 0) {
    clearInterval(countdown);
    countdownElement.innerHTML = "<h4 class='expired'>Время вышло!</h4>";
  }
}

// Обновление счетчика каждую секунду
let countdown = setInterval(getCountTime, 1000);

// Инициализация текущего времени
getCountTime();
