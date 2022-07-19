import './generation-adv.js';
//import './form-validation.js';
//import './map.js';
import './api.js';

import { submitUserForm } from './form-validation.js';
import { renderAdvertisements} from './map.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { showSuccessMessage} from './util.js';


getData(renderAdvertisements, showAlert);
submitUserForm(showSuccessMessage);

function showOk () {
  console.log('ok');
}
