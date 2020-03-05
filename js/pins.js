'use strict';

(function () {
  var pinsTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  function createPinsList(pins) {
    return pins.map(createPin);
  }

  function createPin(obj) {
    var pin = pinsTemplate.cloneNode(true);
    pin.querySelector('img').src = obj.author.avatar;
    pin.querySelector('img').alt = obj.offer.title;
    pin.style.left = obj.location.x + window.consts.PIN_AD_WIDTH / 2 + 'px';
    pin.style.top = obj.location.y - window.consts.PIN_AD_HEIGHT + 'px';
    return pin;
  }

  window.createPinsList = createPinsList;

})();
