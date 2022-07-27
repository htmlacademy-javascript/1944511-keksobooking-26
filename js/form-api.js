import { pristine, type } from './form-validation.js';
import { resetMap, addressFieldDefaultValue } from './map.js';
import { isEscapeKey } from './util.js';
import { clearImgPreview } from './avatar.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const success = '.success';
const error = '.error';
const adFormReset = document.querySelector('.ad-form__reset');
const adFormSubmit = document.querySelector('.ad-form__submit');
let isSuccess;

/** Блокирует кнопку Опубликовать */
const blockSubmitButton = () => {
  adFormSubmit.disabled = true;
  adFormSubmit.textContent = 'Публикую...';
};

/** Разблокирует кнопку Опубликовать */
const unblockSubmitButton = () => {
  adFormSubmit.disabled = false;
  adFormSubmit.textContent = 'Опубликовать';
};

/** Возвращение форм отправки и фильтрации в исходное состояние */
const resetForm = () => {
  const adForm = document.querySelector('.ad-form');
  const filtersForm = document.querySelector('.map__filters');
  const addressField = document.querySelector('#address');
  const event = new Event('change');

  adForm.reset();
  filtersForm.reset();
  type.dispatchEvent(event);
  pristine.reset();
  addressField.value = addressFieldDefaultValue;
  clearImgPreview();
  filtersForm.dispatchEvent(event);
};

/** Удалить сообщение при нажатии ESC */
const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if(isSuccess) {
      hideMessage(success);
    } else {
      hideMessage(error);
    }
  }
};

/** Удалить сообщение по клику */
const onMessageClick = () => {
  if(isSuccess) {
    hideMessage(success);
  } else {
    hideMessage(error);
  }
};

/** Удалить сообщение по клику на кнопку Error*/
const onErrorButtonClick = () => {
  hideMessage(error);
};

/** Удалить сообщение об успешной отправке или ошибке (всплывает)*/
function hideMessage (typeMessage) {
  const message = document.querySelector(typeMessage);
  message.remove();
  document.body.removeEventListener('keydown', onMessageEscKeydown);
  document.body.removeEventListener('click', onMessageClick);
}

/** Показать сообщение об успешной отправке или ошибке */
const showMessage = (template) => {
  const templateItem = template.cloneNode(true);
  isSuccess = (template.matches(success));
  document.body.appendChild(templateItem);
  document.body.addEventListener('keydown', onMessageEscKeydown);
  document.body.addEventListener('click', onMessageClick);
};

/** Возвращение формы  и карты в исходное состояние при успешной отправке, а также показ сообщения пользователю. */
const sendFormSuccessfully = () => {
  showMessage(successTemplate);
  resetForm();
  resetMap();
};

/** Дейсвия при ошибке отправки формы */
const sendFormError = () => {
  showMessage(errorTemplate);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onErrorButtonClick);
};

adFormReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
});

export { sendFormSuccessfully, sendFormError, blockSubmitButton, unblockSubmitButton };
