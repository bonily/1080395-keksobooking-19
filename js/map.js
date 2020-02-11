'use strict';


(function () {
  var ads = window.data.create();
  var pinsList = window.pins.get(ads);
  var map = document.querySelector('.map');
  var pinsListElement = document.querySelector('.map__pins');
  var keydownHandler = function (evt) {
    if (evt.key === window.consts.escKey) {
      removeAd();
    }
  };

  function removeAd() {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', keydownHandler);
  }

  function addAdHandlers(ad) {
    var closeAdButton = ad.querySelector('.popup__close');

    closeAdButton.addEventListener('click', removeAd);
    document.addEventListener('keydown', keydownHandler);
  }

  function onPinClick(evt) {
    var currentPinNumber = evt.currentTarget.dataset.number;
    for (var j = 0; j < pinsList.length; j++) {
      pinsList[j].classList.remove('map__pin--active');
    }
    evt.currentTarget.classList.add('map__pin--active');
    renderCard(ads[currentPinNumber]);
  }

  function setPinHandlers(pin) {
    pin.addEventListener('click', onPinClick);
  }

  function renderCard(adInfo) {
    var currentAd = window.ad.get(adInfo);
    if (document.querySelector('.map__card') !== null) {
      document.querySelector('.map__card').remove();
    }
    map.insertBefore(currentAd, document.querySelector('.map__filters-container'));
    addAdHandlers(currentAd);
  }

  function renderPins() {
    var pinsContainer = document.createDocumentFragment();
    for (var i = 0; i < pinsList.length; i++) {
      pinsList[i].setAttribute('data-number', i);
      pinsContainer.appendChild(pinsList[i]);
      setPinHandlers(pinsList[i]);
    }
    return pinsContainer;
  }

  pinsListElement.appendChild(renderPins());
})();
