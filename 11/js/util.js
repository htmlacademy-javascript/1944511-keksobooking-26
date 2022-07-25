const ALERT_SHOW_TIME = 5000;
const RERENDER_DELAY = 500;

/**  Функция, проверяет пустое ли свойство объекта
 * @param property — свойство объекта
 * @return {boolean} — true or false
 */
function isEmptyProperty (property) {
  return property === undefined;
}

/**  Функция, проверяет на число*/
function isNumeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

/**  Функция, проверяет нажатие ESC*/
function isEscapeKey (evt) {
  return evt.key === 'Escape';
}

/** Показывает сообщение в случае ошибки при получении данных с сервера
 */
function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEmptyProperty, isNumeric, isEscapeKey, showAlert, debounce, RERENDER_DELAY };
