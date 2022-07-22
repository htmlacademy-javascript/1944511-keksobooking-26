import { sendData } from './api.js';
import { blockSubmitButton } from './form-api.js';
import { isNumeric } from './util.js';

const DATA_VALIDATION = {
  title: {
    minLength: 30,
    maxLength: 100
  },
  price: {
    maxPrice: 100000,
    minPrice: {
      bungalow: 0,
      hotel: 3000,
      flat: 1000,
      house: 5000,
      palace: 10000
    }
  },
  rooms: {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  }
};
const DEFAULT_STEP_RANGE = 1;
const adForm = document.querySelector('.ad-form');
const titleField = document.querySelector('#title');
const priceField = document.querySelector('#price');
const roomsField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');
const typeField = document.querySelector('#type');
const timeInField = document.querySelector('#timein');
const timeOutField = document.querySelector('#timeout');
const sliderElement = document.querySelector('.ad-form__slider');
let typeFieldValue = 'flat';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form-error' // Класс для элемента с текстом ошибки
});

//Валидация заголовка
function validateTitle (value) {
  return value.length >= DATA_VALIDATION.title.minLength && value.length <= DATA_VALIDATION.title.maxLength;
}

function getErrorTitleMessage () {
  return `От ${DATA_VALIDATION.title.minLength} до ${DATA_VALIDATION.title.maxLength} символов`;
}

pristine.addValidator(titleField, validateTitle, getErrorTitleMessage);

//Валидация цены
typeField.addEventListener('change', () => {
  const minPriceCurrent = DATA_VALIDATION.price.minPrice[typeField.value];
  typeFieldValue = typeField.value;
  priceField.min = minPriceCurrent;
  priceField.placeholder = minPriceCurrent;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: DATA_VALIDATION.price.minPrice[typeFieldValue],
      max: DATA_VALIDATION.price.maxPrice,
    },
    start: DATA_VALIDATION.price.minPrice[typeFieldValue],
    step: DEFAULT_STEP_RANGE,
  });
  priceField.value = '';
  pristine.validate(priceField);
});

function validatePrice (value) {
  return isNumeric(value) && Number(value) <= DATA_VALIDATION.price.maxPrice && Number(value) >= DATA_VALIDATION.price.minPrice[typeFieldValue];
}

function getErrorPriceMessage () {
  return `Введите число от ${DATA_VALIDATION.price.minPrice[typeFieldValue]} до ${DATA_VALIDATION.price.maxPrice}`;
}

pristine.addValidator(priceField, validatePrice, getErrorPriceMessage);

//Валидация количества комнат и гостей
function validateRoomsAmount () {
  return DATA_VALIDATION.rooms[roomsField.value].includes(capacityField.value);
}

function getErrorRoomsMessage () {
  return 'Выбор количества комнат не соответствует количеству гостей';
}

pristine.addValidator(roomsField, validateRoomsAmount, getErrorRoomsMessage);

capacityField.addEventListener('change', () => {
  pristine.validate(roomsField);
});

//Синхронизация времени заезда-выезда
function synchronizeTime (selectOne, selectTwo) {
  const options = selectTwo.children;
  for (const option of options) {
    option.selected = (option.value === selectOne.value);
  }
}

timeInField.addEventListener('change', synchronizeTime.bind(null, timeInField, timeOutField));
timeOutField.addEventListener('change', synchronizeTime.bind(null, timeOutField, timeInField));

noUiSlider.create(sliderElement, {
  range: {
    min: DATA_VALIDATION.price.minPrice[typeFieldValue],
    max: DATA_VALIDATION.price.maxPrice,
  },
  start: DATA_VALIDATION.price.minPrice[typeFieldValue],
  step: DEFAULT_STEP_RANGE,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
  pristine.validate(priceField);
});

priceField.addEventListener('change', (evt) => {
  sliderElement.noUiSlider.set(evt.target.value);
});

function submitUserForm (onSuccess, onFail) {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(onSuccess, onFail, formData);
    }
  });
}

export { submitUserForm, pristine, typeField };
