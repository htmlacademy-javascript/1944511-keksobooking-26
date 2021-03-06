import { unblockSubmitButton } from './form-api.js';
import { changePageMode } from './form-mode.js';
import { onFilterChange } from './filter.js';

const URL_GETTING_DATE = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SENDING_DATE = 'https://26.javascript.pages.academy/keksobooking';
let isDataLabels = false;

/**  Функция, получает данные с сервера. В случае успеха отрисовывает метки на карте, при ошибке выдает сообщение
 * @param {function} onSuccess функция отрисовки меток
 * @param {function} onFail функция сообщения об ошибке
 */
const getData = (onSuccess, onFail) => {
  fetch(URL_GETTING_DATE)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail(`Ошибка получения данных ${response.status}`);
      }
    })
    .then((advertisements) => {
      onSuccess(advertisements);
      isDataLabels = true;
      changePageMode(true);
      onFilterChange (advertisements);
    })
    .catch((err) => {
      onFail(`Ошибка получения данных ${err.message}`);});
};

/**  Функция, отправляет данные на сервер
 * @param {function} onSuccess функция выполняется при успешной отправке данных
 * @param {function} onFail функция сообщения об ошибке
 * @param {object} body formData
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SENDING_DATE,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        unblockSubmitButton();
      } else {
        onFail();
        unblockSubmitButton();
      }
    })
    .catch(() => {
      onFail();
      unblockSubmitButton();
    });
};

export { getData, sendData, isDataLabels };
