'use strict';

(function () {
  var pinsTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  function createPinsList(pins) {
    return pins.map(createPin);
  }

  function createPin(obj) {
    var pinsElement = pinsTemplate.cloneNode(true);
    pinsElement.querySelector('img').src = obj.author.avatar;
    pinsElement.querySelector('img').alt = obj.offer.title;
    pinsElement.style.left = obj.location.x + 25 + 'px';
    pinsElement.style.top = obj.location.y - 70 + 'px';
    return pinsElement;
  }

  window.createPinsList = createPinsList;

})();
