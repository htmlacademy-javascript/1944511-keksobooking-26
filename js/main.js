import { AMOUNT_ADVERTISEMENTS, createAdvertisement } from './data.js';

const advertisements = [];

for (let i = 0; i < AMOUNT_ADVERTISEMENTS; i++) {
  advertisements.push(createAdvertisement());
}

export {advertisements};
