import { isDataLabels } from './api.js';

const mapFiltersForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.children;
const mapFiltersElements = mapFiltersForm.children;

/** Функция изменяет состояние страницы - активное и неактивное
 * @param {boolean} isActive — для неактивного состояния false, для активного true
 */
function changePageMode (isActive) {
  if (!isActive) {
    adForm.classList.add('ad-form--disabled');
    for (const adFormElement of adFormElements) {
      adFormElement.disabled = true;
    }
    mapFiltersForm.classList.add('map__filters--disabled');
    for (const mapFiltersElement of mapFiltersElements) {
      mapFiltersElement.disabled = true;
    }
  } else {
    adForm.classList.remove('ad-form--disabled');
    for (const adFormElement of adFormElements) {
      adFormElement.disabled = false;
    }
    if (isDataLabels) {
      mapFiltersForm.classList.remove('map__filters--disabled');
      for (const mapFiltersElement of mapFiltersElements) {
        mapFiltersElement.disabled = false;
      }
    }
  }
}

export { changePageMode };
