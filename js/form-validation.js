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
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const slider = document.querySelector('.ad-form__slider');
let typeFieldValue = 'flat';

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form-error' // Класс для элемента с текстом ошибки
});

//Валидация заголовка
const validateTitle = (value) => value.length >= DATA_VALIDATION.title.minLength && value.length <= DATA_VALIDATION.title.maxLength;

const getErrorTitleMessage = () => `От ${DATA_VALIDATION.title.minLength} до ${DATA_VALIDATION.title.maxLength} символов`;

pristine.addValidator(title, validateTitle, getErrorTitleMessage);

//Валидация цены
type.addEventListener('change', () => {
  const minPriceCurrent = DATA_VALIDATION.price.minPrice[type.value];
  typeFieldValue = type.value;
  price.min = minPriceCurrent;
  price.placeholder = minPriceCurrent;
  slider.noUiSlider.updateOptions({
    range: {
      min: DATA_VALIDATION.price.minPrice[typeFieldValue],
      max: DATA_VALIDATION.price.maxPrice,
    },
    start: DATA_VALIDATION.price.minPrice[typeFieldValue],
    step: DEFAULT_STEP_RANGE,
  });
  price.value = '';
  pristine.validate(price);
});

const validatePrice = (value) => isNumeric(value) && Number(value) <= DATA_VALIDATION.price.maxPrice && Number(value) >= DATA_VALIDATION.price.minPrice[typeFieldValue];

const getErrorPriceMessage = () => `Введите число от ${DATA_VALIDATION.price.minPrice[typeFieldValue]} до ${DATA_VALIDATION.price.maxPrice}`;

pristine.addValidator(price, validatePrice, getErrorPriceMessage);

//Валидация количества комнат и гостей
const validateRoomsAmount = () => DATA_VALIDATION.rooms[rooms.value].includes(capacity.value);

const getErrorRoomsMessage = () => 'Выбор количества комнат не соответствует количеству гостей';

pristine.addValidator(rooms, validateRoomsAmount, getErrorRoomsMessage);

capacity.addEventListener('change', () => {
  pristine.validate(rooms);
});

//Синхронизация времени заезда-выезда
function synchronizeTime (selectOne, selectTwo) {
  const options = selectTwo.children;
  for (const option of options) {
    option.selected = (option.value === selectOne.value);
  }
}

timeIn.addEventListener('change', synchronizeTime.bind(null, timeIn, timeOut));
timeOut.addEventListener('change', synchronizeTime.bind(null, timeOut, timeIn));

noUiSlider.create(slider, {
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

slider.noUiSlider.on('update', () => {
  price.value = slider.noUiSlider.get();
  pristine.validate(price);
});

price.addEventListener('change', (evt) => {
  slider.noUiSlider.set(evt.target.value);
});

//Отправляет форму на сервер
const submitUserForm = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      sendData(onSuccess, onFail, formData);
    }
  });
};

export { submitUserForm, pristine, type };
