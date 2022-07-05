import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayElement, createImageAdress, createRandomArray } from './util.js';

const AMOUNT_ADVERTISEMENTS = 5;
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const HOUSING_TYPES = ['palace', 'flat', 'house',' bungalow', 'hotel'];
const RUSSIAN_TYPES = ['Дворец','Квартира', 'Дом', 'Бунгало', 'Отель'];
const MIN_COUNT_ROOMS = 1;
const MAX_COUNT_ROOMS = 5;
const MIN_COUNT_GUESTS = 1;
const MAX_COUNT_GUESTS = 5;
const REGISTRATION_TIMES =['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

/** Функция, генерирует объект - объявление о аренде жилья
 * @return {object} — объект - объявление о аренде жилья
 */
function createAdvertisement() {
  const latitude = getRandomPositiveFloat(MIN_LAT, MAX_LAT, 5);
  const longitude = getRandomPositiveFloat(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: createImageAdress(AMOUNT_ADVERTISEMENTS)
    },
    offer: {
      title: 'Заголовок объявления',
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomPositiveInteger(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
      guests: getRandomPositiveInteger(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS),
      checkin: getRandomArrayElement(REGISTRATION_TIMES),
      checkout: getRandomArrayElement(REGISTRATION_TIMES),
      features: createRandomArray (FEATURES),
      description: 'Описание помещения',
      photos: createRandomArray(PHOTOS),
    },
    location: {
      lat: latitude ,
      lng: longitude
    }
  };
}

const advertisements = [];

function createAdvertisements() {
  for (let i = 0; i < AMOUNT_ADVERTISEMENTS; i++) {
    advertisements.push(createAdvertisement());
  }

  return advertisements;
}

export { createAdvertisements, advertisements, HOUSING_TYPES, RUSSIAN_TYPES };
