//  Функция, возвращающая случайное целое число из переданного диапазона включительно
const getRandomInteger = function(from, till) {
  if (from < 0 || till < 0) {
    return 'Числа должны быть положительными';
  }

  if  (from > till) {
    return 'Начальное значение должно быть меньше конечного';
  }

  return Math.floor(Math.random() * (till - from + 1) + from);
};

//  Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
const getRandomFloat = function(from, till, digits = 0) {
  if (from < 0 || till < 0) {
    return 'Числа должны быть положительными';
  }

  if  (from > till) {
    return 'Начальное значение должно быть меньше конечного';
  }

  return +(Math.random() * (till - from) + from).toFixed(digits);
};

getRandomFloat(3,124.456,4);

getRandomInteger(3,12);
