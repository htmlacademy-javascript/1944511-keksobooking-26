import { pristine, typeField } from './form-validation.js';
import { resetMap, addressFieldDefaultValue } from './map.js';
import { isEscapeKey } from './util.js';


const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const success = '.success';
const error = '.error';
const adFormReset = document.querySelector('.ad-form__reset');
const adFormSubmit = document.querySelector('.ad-form__submit');
let isSuccess;

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
  const addressField = document.querySelector('#address');
  const event = new Event('change');

  adForm.reset();
  filtersForm.reset();
  typeField.dispatchEvent(event);//генерация события в поле типа жилья, чтобы сбросить слайдер
  pristine.reset();
  addressField.value = addressFieldDefaultValue;
}

/** Показать сообщение об успешной отправке или ошибке
 */
function showMessage (template) {
  const templateItem = template.cloneNode(true);
  isSuccess = (template.matches(success));
  document.body.appendChild(templateItem);
  document.body.addEventListener('keydown', onMessageEscKeydown);
  document.body.addEventListener('click', onMessageClick);
}

/** Удалить сообщение об успешной отправке или ошибке
 */
function hideMessage (typeMessage) {
  const message = document.querySelector(typeMessage);
  message.remove();
  document.body.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onMessageClick);
}

/** Удалить сообщение при нажатии ESC
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

/** Удалить сообщение по клику */
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

/** Возвращение формы  и карты в исходное состояние при успешной отправке, а также показ сообщения пользователю. */
function sendFormSuccessfully () {
  showMessage(successTemplate);
  resetForm();
  resetMap();
}

function sendFormError () {
  showMessage(errorTemplate);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
}

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
});

export { sendFormSuccessfully, sendFormError, blockSubmitButton, unblockSubmitButton };
