'use strict';

(function () {

  var ads = window.data.create();
  var pinsList = window.pins.get(ads);
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formBlocks = adForm.querySelectorAll('fieldset');


  function activatePage() {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.changeState(formBlocks, false);
    window.form.setAddress(window.map.getCoords());
  }

  window.map.renderPins(pinsList, ads);
  window.form.setAddress(window.map.getCoords());
  window.map.mainPinClick(activatePage);

})();
