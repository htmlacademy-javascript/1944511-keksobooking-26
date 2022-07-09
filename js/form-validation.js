import { isNumeric } from './util.js';

const DATA_VALIDATION = {
  title: {
    minLength: 30,
    maxLength: 100
  },
  price: {
    maxPrice: 100000
  },
  rooms: {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  }
};
const adForm = document.querySelector('.ad-form');
const title = document.querySelector('#title');
const price = document.querySelector('#price');
const roomsField = document.querySelector('#room_number');
const capacityField = document.querySelector('#capacity');


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element', // Элемент, на который будут добавляться классы
  errorClass: 'form__item--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__item--valid', // Класс, обозначающий валидное поле
  errorTextParent: 'ad-form__element', // Элемент, куда будет выводиться текст с ошибкой
  errorTextTag: 'span', // Тег, который будет обрамлять текст ошибки
  errorTextClass: 'form-error' // Класс для элемента с текстом ошибки
});

function validateTitle (value) {
  return value.length >= DATA_VALIDATION.title.minLength && value.length <= DATA_VALIDATION.title.maxLength;
}

function getErrorTitleMessage (item) {
  return `От ${item.minLength} до ${item.maxLength} символов`;
}

pristine.addValidator(title, validateTitle, getErrorTitleMessage (DATA_VALIDATION.title));

function validatePrice (value) {
  return isNumeric(value) && value <= 100000;
}

function getErrorPriceMessage (item) {
  return `Введите число до ${item.maxPrice}`;
}

pristine.addValidator(price, validatePrice, getErrorPriceMessage(DATA_VALIDATION.price));

function validateRoomsAmount () {
  return DATA_VALIDATION.rooms[roomsField.value].includes(capacityField.value);
}

function getErrorRoomsMessage () {
  return 'Выбор количества гостей не соответствует количеству комнат';
}

pristine.addValidator(roomsField, validateRoomsAmount, getErrorRoomsMessage);

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    adForm.submit();
  }
});

