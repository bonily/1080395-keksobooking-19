'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinsListElement = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStartCoords = {
    x: parseInt(pinMain.style.left, 10),
    y: parseInt(pinMain.style.top, 10)
  };
  var keydownHandler = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      removeAd();
    }
  };

  function removeAd() {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
      document.removeEventListener('keydown', keydownHandler);
    }
  }


  function renderAd(adInfo) {
    removeAd();
    var adElement = window.createdAd(adInfo);
    addAdHandlers(adElement);
    map.insertBefore(adElement, document.querySelector('.map__filters-container'));
  }

  function addAdHandlers(ad) {
    var closeAdButton = ad.querySelector('.popup__close');

    closeAdButton.addEventListener('click', removeAd);
    document.addEventListener('keydown', keydownHandler);
  }

  function renderPins(ads) {
    removeAd();
    removePins();
    // ads (в данном случае сгенерированный массив объявлений) приходит из main.js
    var pinsList = window.pins.get(ads);
    var pinsContainer = document.createDocumentFragment();

    ads.forEach(function (item, i) {
      var currentPin = pinsList[i];
      pinsContainer.appendChild(currentPin);
      currentPin.addEventListener('click', function (evt) {
        renderAd(item);
        evt.currentTarget.classList.add('map__pin--active');
      });
    });
    pinsListElement.appendChild(pinsContainer);
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
      y: parseInt(pinPosition.y, 10) + (isMapActive() ? window.consts.PIN_MAIN_HEIGTH + window.consts.PIN_MAIN_NIB : Math.round(window.consts.PIN_MAIN_HEIGTH / 2))
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
    if (pinsListElement.querySelectorAll('.map__pin').length > 0) {
      removePins();
    }
  }

  function removePins() {
    var pinsList = pinsListElement.querySelectorAll('.map__pin');
    for (var i = 1; i < pinsList.length; i++) {
      pinsListElement.removeChild(pinsListElement.lastChild);
    }
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

  window.map = {
    renderPins: renderPins,
    // removePins: removePins,
    removeAd: removeAd,
    getCoords: getCoords,
    activate: activateMap,
    deactivate: deactivateMap,
    setMainPinClick: function (cb) {
      pinMain.addEventListener('mousedown', function (evt) {
        if (evt.which === 1) {
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
      pinMain.addEventListener('mousedown', function (evt) {
        if (evt.which === 1) {
          var startCoords = {
            x: evt.clientX,
            y: evt.clientY
          };

          var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
              x: startCoords.x - moveEvt.clientX,
              y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
              x: moveEvt.clientX,
              y: moveEvt.clientY
            };


            // function getPositionY(newCoordY) {
            //   var pinCoords = getCoords(); // функция вернёт координату кончика пина. По нему и ориентируемся, выстраивая ограничения
            //   switch (true) {
            //     case (pinCoords.y < 130):
            //       return pinMain.offsetTop;
            //     case (pinCoords.y > 630):
            //       return pinMain.offsetTop;
            //     default: return newCoordY;
            //   }
            // }

            // function getPositionX(newCoordX) {
            //   var mapWidth = parseInt(map.offsetWidth, 10);
            //   switch (true) {
            //     case (newCoordX > mapWidth):
            //       return (mapWidth - Math.round(window.consts.PIN_MAIN_WIDTH / 2));
            //     case (newCoordX < 0):
            //       return -Math.round(window.consts.PIN_MAIN_WIDTH / 2);
            //     default:
            //       return newCoordX;
            //   }
            // }

            var newPinMainCoords = {
              x: pinMain.offsetLeft - shift.x,
              y: pinMain.offsetTop - shift.y
            };

            var updatedPositions = getPosition(newPinMainCoords);

            pinMain.style.top = updatedPositions.y + 'px';
            pinMain.style.left = updatedPositions.x + 'px';


            cb();
          };

          var onMouseUp = function (upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }
      });
    }
  };


})();
