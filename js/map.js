'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinPlace = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStartCoords = {
    x: parseInt(pinMain.style.left, 10),
    y: parseInt(pinMain.style.top, 10)
  };
  var startCoords;
  var moveCallBack;
  var activeAd;
  var activePin;
  var pins = [];

  function onKeyDown(evt) {
    if (evt.key === window.consts.ESC_KEY) {
      removeAd();
    }
  }

  function onCloseBtnClick() {
    removeAd();
  }


  function removeAd() {
    if (activeAd) {
      activeAd.remove();
      activePin.classList.remove('map__pin--active');
      document.removeEventListener('keydown', onKeyDown);
    }
  }


  function renderAd(adInfo) {
    removeAd();
    var ad = window.createAd(adInfo);
    addAdHandlers(ad);
    activeAd = ad;
    map.insertBefore(ad, document.querySelector('.map__filters-container'));
  }

  function addAdHandlers(ad) {
    var closeAdButton = ad.querySelector('.popup__close');

    closeAdButton.addEventListener('click', onCloseBtnClick);
    document.addEventListener('keydown', onKeyDown);
  }

  function renderPins(ads) {
    removeAd();
    removePins();
    // ads (в данном случае сгенерированный массив объявлений) приходит из main.js
    var pinsContainer = document.createDocumentFragment();
    pins = window.createPinsList(ads);
    ads.forEach(function (item, i) {
      var currentPin = pins[i];
      pinsContainer.appendChild(currentPin);
      currentPin.addEventListener('click', function (evt) {
        renderAd(item);
        activePin = evt.currentTarget;
        evt.currentTarget.classList.add('map__pin--active');
      });
    });
    pinPlace.appendChild(pinsContainer);
  }

  function getCoords() {
    var pinPosition = {
      x: parseInt(pinMain.style.left, 10),
      y: parseInt(pinMain.style.top, 10)
    };
    return calcCoordsByPinPosition(pinPosition);
  }

  function calcCoordsByPinPosition(pinPosition) {
    return {
      x: parseInt(pinPosition.x, 10) + Math.round(window.consts.PIN_MAIN_WIDTH / 2),
      y: parseInt(pinPosition.y, 10) + (isMapActive() ? window.consts.PIN_MAIN_HEIGHT + window.consts.PIN_MAIN_NIB : Math.round(window.consts.PIN_MAIN_HEIGHT / 2))
    };
  }

  function getPosition(newCoords) { // принимает новые смещенные значения пина
    var pinCoords = calcCoordsByPinPosition(newCoords);
    var mapWidth = parseInt(map.offsetWidth, 10);

    return {
      x: pinCoords.x > mapWidth || pinCoords.x < 0 ? pinMain.offsetLeft : newCoords.x,
      y: pinCoords.y < window.consts.MAP_HEIGTH_MIN || pinCoords.y > window.consts.MAP_HEIGTH_MAX ? pinMain.offsetTop : newCoords.y
    };
  }

  function activateMap() {
    map.classList.remove('map--faded');
  }

  function isMapActive() {
    return !map.classList.contains('map--faded');
  }

  function deactivateMap() {
    map.classList.add('map--faded');
    checkPinMainCoords();
    if (pins.length > 0) {
      removePins();
    }
  }

  function removePins() {
    pins.forEach(function () {
      pinPlace.removeChild(pinPlace.lastChild);
    });
    pins = [];
  }


  function checkPinMainCoords() {
    var currentCoords = {
      x: parseInt(pinMain.style.left, 10),
      y: parseInt(pinMain.style.top, 10)
    };
    if (pinMainStartCoords.x - currentCoords.x !== 0 || pinMainStartCoords.y - currentCoords.y !== 0) {
      pinMain.style.left = pinMainStartCoords.x + 'px';
      pinMain.style.top = pinMainStartCoords.y + 'px';
    }
  }


  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(evt) {
    evt.preventDefault();

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var newPinMainCoords = {
      x: pinMain.offsetLeft - shift.x,
      y: pinMain.offsetTop - shift.y
    };

    var updatedPositions = getPosition(newPinMainCoords);

    pinMain.style.top = updatedPositions.y + 'px';
    pinMain.style.left = updatedPositions.x + 'px';

    moveCallBack();
  }

  window.map = {
    renderPins: renderPins,
    removeAd: removeAd,
    getCoords: getCoords,
    activate: activateMap,
    deactivate: deactivateMap,
    setMainPinClick: function (cb) {
      pinMain.addEventListener('mousedown', function (evt) {
        if (evt.which === window.consts.LEFT_MOUSE_BUTTON_KEY) {
          cb();
        }
      },
      {once: true});

      pinMain.addEventListener('keydown', function (evt) {
        if (evt.key === window.consts.ENTER_KEY) {
          cb();
        }
      },
      {once: true});
    },
    setMainPinMove: function (cb) {
      moveCallBack = cb;
      pinMain.addEventListener('mousedown', function (evt) {
        if (evt.which === window.consts.LEFT_MOUSE_BUTTON_KEY) {
          startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
    }
  };


})();
