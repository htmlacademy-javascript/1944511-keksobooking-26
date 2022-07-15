import { changePageMode } from './form-mode.js';

changePageMode(false);

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта инициализирована');
    changePageMode(true);
  })
  .setView({
    lat: 35.67500,
    lng: 139.75000,
  }, 10);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const marker = L.marker(
  {
    lat: 35.67500,
    lng: 139.75000,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);
marker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});

// resetButton.addEventListener('click', () => {
//   mainPinMarker.setLatLng({
//     lat: 59.96831,
//     lng: 30.31748,
//   });

// map.setView({
//   lat: 35.67500,
//     lng: 139.75000,
// }, 16);
// });




console.log('map');
