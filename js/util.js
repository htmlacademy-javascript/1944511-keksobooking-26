const RERENDER_DELAY = 500;
const ALERT_PARAMS = {
  showTime: 5000,
  zIndex: '100',
  position: 'absolute',
  left: '0',
  top: '0',
  right: '0',
  padding: '10px 3px',
  fontSize: '30px',
  textAlign: 'center',
  backgroundColor: 'red'
};

/**  Функция, проверяет пустое ли свойство объекта
 * @param property — свойство объекта
 * @return {boolean} — true or false
 */
const isEmptyProperty = (property) => property === undefined;

/**  Функция, проверяет на число*/
const isNumeric = (num) => !isNaN(parseFloat(num)) && isFinite(num);

/**  Функция, проверяет нажатие ESC*/
const isEscapeKey = (evt) => evt.key === 'Escape';

/** Показывает сообщение в случае ошибки при получении данных с сервера*/
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.zIndex = ALERT_PARAMS.zIndex;
  alert.style.position = ALERT_PARAMS.position;
  alert.style.left = ALERT_PARAMS.left;
  alert.style.top = ALERT_PARAMS.top;
  alert.style.right = ALERT_PARAMS.right;
  alert.style.padding = ALERT_PARAMS.padding;
  alert.style.fontSize = ALERT_PARAMS.fontSize;
  alert.style.textAlign = ALERT_PARAMS.textAlign;
  alert.style.backgroundColor = ALERT_PARAMS.backgroundColor;

  alert.textContent = message;
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, ALERT_PARAMS.showTime);
};

//Устраняет дребезг
const debounce = (callback, timeoutDelay = RERENDER_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEmptyProperty, isNumeric, isEscapeKey, showAlert, debounce, RERENDER_DELAY };
