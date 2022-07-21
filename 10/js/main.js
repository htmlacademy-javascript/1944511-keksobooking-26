import './generation-adv.js';
import './api.js';
import './map.js';
import './util.js';
import { submitUserForm } from './form-validation.js';
import { sendFormSuccessfully, sendFormError} from './form-api.js';

submitUserForm(sendFormSuccessfully, sendFormError);
