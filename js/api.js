const URL_GETTING_DATE = 'https://26.javascript8.pages.academy/keksobooking/data';
const URL_SENDING_DATE = 'https://26.javascript.pages.academy/keksobooking';

function getData (onSuccess, onFail) {
  fetch(URL_GETTING_DATE)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Ошибка получения данных');
      }
    })
    .then((advertisements) => {
      onSuccess(advertisements);
    })
    .catch(() => {
      onFail('Ошибка получения данных');});
}

function sendData (onSuccess, onFail, body) {
  fetch(
    URL_SENDING_DATE,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        document.querySelector('.ad-form').reset();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}

export { getData, sendData};

