import { renderAdvertisements, clearLayers } from './map.js';
import { debounce, RERENDER_DELAY } from './util.js';

const PRICE_RANGE = {
  low: {
    from: 0,
    to: 10000
  },
  middle: {
    from: 10000,
    to: 50000
  },
  high: {
    from: 50000,
    to: 100000
  },
  any: {
    from: 0,
    to: 100000
  }
};
const DEFAULT_VALUE = 'any';
const filterForm = document.querySelector('.map__filters');

/**  Проверка соответствия типа жилья */
const checkMatchType = (value, advertisement) => value === advertisement.offer.type || value === DEFAULT_VALUE;

/**  Проверка соответствия цены */
const checkMatchPrice = (value, advertisement) => advertisement.offer.price >= PRICE_RANGE[value].from && advertisement.offer.price <= PRICE_RANGE[value].to;

/**  Проверка соответствия количества комнат */
const checkMatchRooms = (value, advertisement) => Number(value) === advertisement.offer.rooms || value === DEFAULT_VALUE;

/**  Проверка соответствия количества гостей*/
const checkMatchGuests = (value, advertisement) => Number(value) === advertisement.offer.guests || value === DEFAULT_VALUE;

/**  Проверка соответствия преимуществ */
const checkMatchFeatures = (inputs, advertisement) => {
  const featuresCheckedArray = [];
  for (const input of inputs) {
    featuresCheckedArray.push(input.value);
  }
  if (advertisement.offer.features) {
    return featuresCheckedArray.every((elem) => advertisement.offer.features.includes(elem));
  }
  return false;
};

/** Фильтрует объявления при изменении любого из полей фильтрации */
const onFilterChange = (advertisements) => {
  filterForm.addEventListener('change', debounce(() => {
    const type = document.querySelector('#housing-type').value;
    const rooms = document.querySelector('#housing-rooms').value;
    const price = document.querySelector('#housing-price').value;
    const guests = document.querySelector('#housing-guests').value;
    const featuresList = document.querySelectorAll('.map__checkbox:checked');
    const filteredAdvertisements = advertisements.filter((elem) => checkMatchType(type, elem) && checkMatchPrice (price, elem) && checkMatchRooms (rooms, elem) && checkMatchGuests (guests, elem) && ((featuresList.length) ?checkMatchFeatures(featuresList, elem) : true)
    );
    clearLayers();
    renderAdvertisements(filteredAdvertisements);
  }, RERENDER_DELAY));
};

export { onFilterChange };
