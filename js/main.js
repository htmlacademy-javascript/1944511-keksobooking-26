const AMOUNT_ADVERTISEMENTS = 10;
const MIN_PRICE = 10000;
const MAX_PRICE = 100000;
const HOUSING_TYPES = ['palace', 'flat', 'house',' bungalow', 'hotel'];
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
const advertisements = [];

//  Функция, возвращающая случайное целое число из переданного диапазона включительно
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

//  Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function createImageAdress (amount) {
  let strImageAdress = '';
  const imageNumber = getRandomPositiveInteger (1, amount);
  if (imageNumber < 10) {
    strImageAdress = `img/avatars/user0${imageNumber}.png`;
  } else {
    strImageAdress = `img/avatars/user${imageNumber}.png`;
  }

  for (let i = 0; i < advertisements.length; i++) {
    if (advertisements[i].author.avatar === strImageAdress) {
      createImageAdress (amount);
    }
  }
  return strImageAdress;
}

function createRandomArray (array) {
  const randomArray = [];
  const randomNumber = getRandomPositiveInteger (1, array.length);
  for (let i = 0; i < randomNumber; i++) {
    const randomArrayElement = getRandomArrayElement (array);
    if (!randomArray.includes(randomArrayElement)) {
      randomArray.push(randomArrayElement);
    }
  }
  return randomArray;
}

function createAdvertisement () {
  const latitude = getRandomPositiveFloat(MIN_LAT, MAX_LAT, 5);
  const longitude = getRandomPositiveFloat(MIN_LNG, MAX_LNG, 5);

  return {
    author: {
      avatar: createImageAdress(AMOUNT_ADVERTISEMENTS)
    },
    offer: {
      title: 'Заголовок объявления',
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger (MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomPositiveInteger(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
      guests: getRandomPositiveInteger(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS),
      checkin: getRandomArrayElement(REGISTRATION_TIMES),
      checkout: getRandomArrayElement(REGISTRATION_TIMES),
      features: createRandomArray (FEATURES),
      description: 'Описание помещения',
      photos: createRandomArray (PHOTOS),
    },
    location: {
      lat: latitude ,
      lng: longitude
    }
  };
}

for (let i= 0; i <AMOUNT_ADVERTISEMENTS; i++) {
  advertisements.push(createAdvertisement());
}


