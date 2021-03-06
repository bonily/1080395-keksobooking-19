'use strict';
(function () {
  var errors = {
    400: 'Неверный запрос',
    401: 'Пользователь не авторизован',
    404: 'Ничего не найдено'
  };

  function newRequest(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.consts.SUCCESS_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + errors[xhr.status]);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    return xhr;
  }

  function fetchAds(url, onSuccess, onError) {
    var xhr = newRequest(onSuccess, onError);

    xhr.open('GET', url);
    xhr.send();
  }

  function uploadForm(url, data, onSuccess, onError) {
    var xhr = newRequest(onSuccess, onError);
    xhr.open('POST', url);
    xhr.send(data);
  }

  window.request = {
    fetchAds: fetchAds,
    uploadForm: uploadForm,
  };
})();
