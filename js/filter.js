import { renderAdvertisements, clearLayers } from './map.js';

const filterForm = document.querySelector('.map__filters');

function onFilterChange (advertisements) {
  filterForm.addEventListener('change', () => {
    const type = document.querySelector('#housing-type').value;
    const rooms = document.querySelector('#housing-rooms').value;
    const arr = advertisements.filter((elem) => type === elem.offer.type);
    console.log(5, arr);
    clearLayers();
    renderAdvertisements(arr);
  });
}

export { onFilterChange };
