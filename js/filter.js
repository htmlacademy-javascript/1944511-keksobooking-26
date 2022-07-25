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

function checkMatchType (value, advertisement) {
  return value === advertisement.offer.type || value === DEFAULT_VALUE;
}

function checkMatchPrice (value, advertisement) {
  return advertisement.offer.price >= PRICE_RANGE[value].from && advertisement.offer.price <= PRICE_RANGE[value].to;
}

function checkMatchRooms (value, advertisement) {
  return Number(value) === advertisement.offer.rooms || value === DEFAULT_VALUE;
}

function checkMatchGuests (value, advertisement) {
  return Number(value) === advertisement.offer.guests || value === DEFAULT_VALUE;
}

function checkMatchFeatures (inputs, advertisement) {
  const featuresCheckedArray = [];
  for (const input of inputs) {
    featuresCheckedArray.push(input.value);
  }
  if (advertisement.offer.features) {
    return featuresCheckedArray.every((elem) => advertisement.offer.features.includes(elem));
  }
  return false;
}

function onFilterChange (advertisements) {
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
}

export { onFilterChange };
