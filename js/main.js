'use strict';

(function () {

  var ads = [];

  function onError() {
    // console.error(message);
  }

  function onSuccess(data) {
    ads = data;
  }

  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.map.renderPins(ads);
    window.form.setAddress(window.map.getCoords());
  }
  function setNewAddress() {
    window.form.setAddress(window.map.getCoords());
  }

  window.form.deactivate();
  window.map.deactivate();

  window.form.setAddress(window.map.getCoords());
  window.map.setMainPinClick(activatePage);
  window.map.moveMainPin(setNewAddress);
  window.request('https://js.dump.academy/keksobooking/data', onSuccess, onError);

})();
