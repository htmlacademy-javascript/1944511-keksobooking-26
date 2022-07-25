import { changePageMode } from './form-mode.js';
import { createCardElement } from './generation-adv.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const DEFAULT_LAT = 35.67500;
const DEFAULT_LNG = 139.75000;
const DEFAULT_SCALE = 13;
const MAIN_ICON_LENGTH = 52;
const MAIN_ICON_WIDTH = 52;
const MAIN_ICON_CENTER = 26;
const ICON_LENGTH = 40;
const ICON_WIDTH = 40;
const ICON_CENTER = 20;
const AMOUNT_LABEL = 10;
const addressField = document.querySelector('#address');
const addressFieldDefaultValue = `${DEFAULT_LAT}, ${DEFAULT_LNG}`;

changePageMode(false);
addressField.value = addressFieldDefaultValue;

const map = L.map('map-canvas')
  .on('load', () => {
    changePageMode(true);
    getData(renderAdvertisements, showAlert);
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_ICON_WIDTH, MAIN_ICON_LENGTH],
  iconAnchor: [MAIN_ICON_CENTER, MAIN_ICON_LENGTH],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [ICON_WIDTH, ICON_LENGTH],
  iconAnchor: [ICON_CENTER, ICON_LENGTH],
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

const markerGroup = L.layerGroup().addTo(map);

function clearLayers () {
  markerGroup.clearLayers();
  hideBaloons();
}

function renderAdvertisements (advertisements) {
  advertisements.slice(0, AMOUNT_LABEL).forEach((advertisement) => {
    const marker = L.marker(
      {
        lat: advertisement.location.lat,
        lng: advertisement.location.lng
      },
      {
        icon: pinIcon,
      },
    );
    marker.addTo(markerGroup).bindPopup(createCardElement(advertisement));
  });
}

function hideBaloons () {
  map.closePopup();
}

/** Возвращение карты в исходное состояние */
function resetMap () {
  hideBaloons();
  map.setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);
  mainMarker.setLatLng({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  });
}

export { resetMap, addressFieldDefaultValue, renderAdvertisements, clearLayers };
