'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinsListElement = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var adList = [];
  var keydownHandler = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      removeAd();
    }
  };

  function removeAd() {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', keydownHandler);
  }

  function addAdHandlers(ad) {
    var closeAdButton = ad.querySelector('.popup__close');

    closeAdButton.addEventListener('click', removeAd);
    document.addEventListener('keydown', keydownHandler);
  }

  function renderPins(ads) { // ads (в данном случае сгенерированный массив объявлений) приходит из main.js
    var pinsList = window.pins.get(ads);
    var pinsContainer = document.createDocumentFragment();

    for (var i = 0; i < pinsList.length; i++) {
      var currentPin = pinsList[i];
      var ad = window.ad(ads[i]); // создаем карточку объявления на основе текущего объекта методом из ad.js

      adList.push(ad); // не придумала способобойти этот костыль, он для функции onPinClick
      currentPin.setAttribute('data-number', i);
      pinsContainer.appendChild(currentPin);

      currentPin.addEventListener('click', onPinClick);
    }
    pinsListElement.appendChild(pinsContainer);
  }

  function onPinClick(evt) {
    var currentPinNumber = evt.currentTarget.dataset.number;

    if (document.querySelector('.map__pin--active') !== null) {
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    }

    if (document.querySelector('.map__card') !== null) {
      document.querySelector('.map__card').remove();
    }

    evt.currentTarget.classList.add('map__pin--active');
    addAdHandlers(adList[currentPinNumber]);
    map.insertBefore(adList[currentPinNumber], document.querySelector('.map__filters-container'));
  }

  function getCoords() {
    return {
      x: parseInt(pinMain.style.left, 10) + Math.round(window.consts.PIN_MAIN_WIDTH / 2),
      y: parseInt(pinMain.style.top, 10) + (isMapActive() ? window.consts.PIN_MAIN_HEIGTH + window.consts.PIN_MAIN_NIB : Math.round(window.consts.PIN_MAIN_HEIGTH / 2))
    };
  }
  function activatePage() {
    map.classList.remove('map--faded');
  }

  function isMapActive() {
    return !map.classList.contains('map--faded');
  }

  function deactivatePage() {
    map.classList.add('map--faded');
  }


  window.map = {
    renderPins: renderPins,
    getCoords: getCoords,
    activate: activatePage,
    deactivate: deactivatePage,
    setMainPinClick: function (cb) {
      pinMain.addEventListener('mousedown', function (evt) {
        if (evt.which === 1) {
          cb();
        }
      });

      pinMain.addEventListener('keydown', function (evt) {
        if (evt.key === window.consts.ENTER_KEY) {
          cb();
        }
      });
    }
  };
})();
