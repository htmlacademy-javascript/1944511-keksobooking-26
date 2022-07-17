import { changePageMode } from './form-mode.js';
import { advertisementsArray, createCardElement } from './generation-adv.js';

const DEFAULT_LAT = 35.67500;
const DEFAULT_LNG = 139.75000;
const addressField = document.querySelector('#address');
const addressFieldDefaultValue = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;

changePageMode(false);
addressField.value = addressFieldDefaultValue;

const map = L.map('map-canvas')
  .on('load', () => {
    changePageMode(true);
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, 14);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarker = L.marker(
  {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const lat = evt.target.getLatLng().lat.toFixed(5);
  const lng = evt.target.getLatLng().lng.toFixed(5);
  addressField.value = `${lat}, ${lng}`;
});

advertisementsArray.forEach((advertisement) => {
  const marker = L.marker(
    {
      lat: advertisement.location.lat,
      lng: advertisement.location.lng
    },
    {
      icon: pinIcon,
    },
  );
  marker.addTo(map).bindPopup(createCardElement(advertisement));
});
