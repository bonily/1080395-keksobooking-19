'use strict';

(function () {

  /**
 * Будет принимать сообщение об ошибке и передавать его дальше в шаблон???
 * @param {string} message
 */
  function onError() {
    window.map.setMainPinClick(activatePage);
  }

  function activatePage() {
    window.request.fetchAds('https://js.dump.academy/keksobooking/data',
        function (data) {
          window.map.activate();
          window.form.activate();
          window.map.renderPins(data);
          window.form.setAddress(window.map.getCoords());
        }
        , onError);
  }

  function deativatePage() {
    window.form.deactivate();
    window.map.deactivate();
    window.map.removePins();
    window.map.setMainPinClick(activatePage);
    window.form.setAddress(window.map.getCoords());
  }

  function setNewAddress() {
    window.form.setAddress(window.map.getCoords());
  }

  window.form.deactivate();
  window.map.deactivate();

  window.map.setMainPinClick(activatePage);
  window.map.moveMainPin(setNewAddress);
  window.form.submitForm(deativatePage);
  window.form.setAddress(window.map.getCoords());
  window.form.resetForm(setNewAddress);


})();
