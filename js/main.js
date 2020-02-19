'use strict';

(function () {

  /**
 * Будет принимать сообщение об ошибке и передавать его дальше в шаблон???
 * @param {string} message
 */
  function onError() {
    // console.error(message);
  }

  function activatePage() {
    window.fetchAds('https://js.dump.academy/keksobooking/data',
        function (data) {
          window.map.activate();
          window.form.activate();
          window.map.renderPins(data);
          window.form.setAddress(window.map.getCoords());
        }
        , onError);
  }

  function setNewAddress() {
    window.form.setAddress(window.map.getCoords());
  }

  window.form.deactivate();
  window.map.deactivate();

  window.form.setAddress(window.map.getCoords());
  window.map.setMainPinClick(activatePage);
  window.map.moveMainPin(setNewAddress);


})();
