import { pristine, typeField } from './form-validation.js';
import { map, mainMarker, DEFAULT_LAT, DEFAULT_LNG, DEFAULT_SCALE } from './map.js';
import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const success = '.success';
const error = '.error';
const adFormReset = document.querySelector('.ad-form__reset');
const adFormSubmit = document.querySelector('.ad-form__submit');
let isSuccess;

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

function blockSubmitButton () {
  adFormSubmit.disabled = true;
  adFormSubmit.textContent = 'Публикую...';
}

function unblockSubmitButton () {
  adFormSubmit.disabled = false;
  adFormSubmit.textContent = 'Опубликовать';
}

/** Возвращение форм отправки и фильтрации в исходное состояние
 */
function resetForm () {
  const adForm = document.querySelector('.ad-form');
  const filtersForm = document.querySelector('.map__filters');
  const event = new Event('change');

  adForm.reset();
  filtersForm.reset();
  typeField.dispatchEvent(event);//генерация события в поле типа жилья, чтобы сбросить слайдер
  pristine.reset();
  map.closePopup();//удалить балуны
  map.setView({//вернуть карту в исходное состояние
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
  document.querySelector('#address').value =`${DEFAULT_LAT}, ${DEFAULT_LNG}`;
}

/** Показать сообщение об успешной отправке
 */
function showMessage (template) {
  const templateItem = template.cloneNode(true);
  isSuccess = (template.matches(success));
  document.body.appendChild(templateItem);
  document.body.addEventListener('keydown', onMessageEscKeydown);
  document.body.addEventListener('click', onMessageClick);
}

/** Удалить сообщение об успешной отправке
 */
function hideMessage (typeMessage) {
  const message = document.querySelector(typeMessage);
  message.remove();
  document.body.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onMessageClick);
}

/** Удалить сообщение об успешной отправке при нажатии ESC
 */
function onMessageEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(isSuccess) {
      hideMessage(success);
    } else {
      hideMessage(error);
    }
  }
}

/** Удалить сообщение об успешной отправке по клику
 */
function onMessageClick () {
  if(isSuccess) {
    hideMessage(success);
  } else {
    hideMessage(error);
  }
}

function onErrorButtonClick () {
  hideMessage(error);
}

/** Возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
 */
function sendFormSuccessfully () {
  showMessage(successTemplate);//показать сообщение об успешной отправке
  resetForm();//сбросить формы
}

function sendFormError () {
  showMessage(errorTemplate);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
}

adFormReset.addEventListener('click', () => {
  resetForm();
});

export { sendFormSuccessfully, sendFormError, showAlert, blockSubmitButton, unblockSubmitButton };
