'use strict';

(function () {

  var ads = window.data.create();
  var pinsList = window.pins.get(ads);


  function activatePage() {
    window.map.activate();
    window.form.activate();
    window.form.setAddress(window.map.getCoords());
  }

  window.form.disactivate();
  window.map.disactivate();
  window.map.renderPins(pinsList, ads);
  window.form.setAddress(window.map.getCoords());
  window.map.setMainPinClick(activatePage);

})();
