import { createAdvertisements, HOUSING_TYPES, RUSSIAN_TYPES } from './data.js';
import { isEmptyProperty } from './util.js';

const advertisementsArray = createAdvertisements();
const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertisementsFragment = document.createDocumentFragment();

advertisementsArray.forEach((advertisement) => {
  const advertisementItem = advertisementTemplate.cloneNode(true);
  const featuresList = advertisementItem.querySelector('.popup__features');
  const photosList = advertisementItem.querySelector('.popup__photos');
  const photo = advertisementItem.querySelector('.popup__photo');
  const title = advertisementItem.querySelector('.popup__title');
  const address = advertisementItem.querySelector('.popup__text--address');
  const price = advertisementItem.querySelector('.popup__text--price');
  const capacity = advertisementItem.querySelector('.popup__text--capacity');
  const time = advertisementItem.querySelector('.popup__text--time');
  const description = advertisementItem.querySelector('.popup__description');
  const type = advertisementItem.querySelector('.popup__type');
  const avatar = advertisementItem.querySelector('.popup__avatar');

  if(!isEmptyProperty(advertisement.offer.features)) {
    const featuresArray = advertisement.offer.features;
    featuresList.innerHTML = '';
    featuresArray.forEach((featuresItem) => {
      const li  = document.createElement('li');
      li.classList.add('popup__feature', `popup__feature--${featuresItem}`);
      featuresList.appendChild(li);
    });
  } else {
    featuresList.style.display = 'none';
  }

  if(!isEmptyProperty(advertisement.offer.photos)) {
    const photosArray = advertisement.offer.photos;
    photosList.innerHTML = '';
    photosArray.forEach((photoItem) => {
      const photoClone = photo.cloneNode(true);
      photoClone.src = photoItem;
      photosList.appendChild(photoClone);
    });
  } else {
    photosList.style.display = 'none';
  }

  if(!isEmptyProperty(advertisement.offer.title)) {
    title.textContent = advertisement.offer.title;
  } else {
    title.style.display = 'none';
  }

  if(!isEmptyProperty(advertisement.offer.address)) {
    address.textContent = advertisement.offer.address;
  } else {
    address.style.display = 'none';
  }

  if(!isEmptyProperty(advertisement.offer.price)) {
    price.textContent = `${advertisement.offer.price} ₽/ночь`;
  } else {
    price.style.display = 'none';
  }

  if(isEmptyProperty(advertisement.offer.rooms) || isEmptyProperty(advertisement.offer.guests)) {
    capacity.style.display = 'none';
  } else {
    capacity.textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  }

  if(isEmptyProperty(advertisement.offer.checkin) || isEmptyProperty(advertisement.offer.checkout)) {
    time.style.display = 'none';
  } else {
    time.textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  }

  if(!isEmptyProperty(advertisement.offer.description)) {
    description.textContent = advertisement.offer.description;
  } else {
    description.style.display = 'none';
  }

  if(!isEmptyProperty(advertisement.offer.type)) {
    type.textContent = RUSSIAN_TYPES[HOUSING_TYPES.indexOf(advertisement.offer.type)];
  } else {
    type.style.display = 'none';
  }

  if(!isEmptyProperty(advertisement.offer.avatar)) {
    avatar.src = advertisement.author.avatar;
  } else {
    avatar.style.display = 'none';
  }

  advertisementsFragment.appendChild(advertisementItem);
});
