'use strict';

var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adSubmit = adForm.querySelector('.ad-form__submit');
var roomsNumber = adForm.querySelector('#room_number');
var capacitySelection = adForm.querySelector('#capacity');
var formBlocks = adForm.querySelectorAll('fieldset');
var adressContainer = adForm.querySelector('#address');
var adTitle = document.querySelector('#title');
var adPrice = document.querySelector('#price');
var adHomeType = document.querySelector('#type');
var adTime = document.querySelector('.ad-form__element--time');
var adTimeCheckIn = adTime.querySelector('#timein');
var adTimeCheckOut = adTime.querySelector('#timeout');
var map = document.querySelector('.map');


adTime.addEventListener('change', function (evt) {
  setTime(evt.target.name, evt.target.value);
});
adHomeType.addEventListener('change', function () {
  setMinPrice();
});
adTitle.addEventListener('invalid', function () {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Имя не должно превышать 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Обязательное поле');
  } else {
    adTitle.setCustomValidity('');
  }
});
adForm.classList.add('ad-form--disabled');
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    activatePage();
  }
});
pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === window.consts.enterKey) {
    activatePage();
  }
});
adSubmit.addEventListener('click', function () {
  return checkRoomsCapacityValue(roomsNumber.value, capacitySelection.value);
});

function setMinPrice() {
  var currentHomeType = adHomeType.value;
  switch (currentHomeType) {
    case 'bungalo':
      adPrice.min = 0;
      adPrice.placeholder = 0;
      break;
    case 'flat':
      adPrice.min = 1000;
      adPrice.placeholder = 1000;
      break;
    case 'house':
      adPrice.min = 5000;
      adPrice.placeholder = 5000;
      break;
    case 'palace':
      adPrice.min = 10000;
      adPrice.placeholder = 10000;
      break;
  }
}

function setTime(type, time) {
  var input = type === 'timein' ? adTimeCheckOut : adTimeCheckIn;
  input.value = time;
}

function changeDisabledState(blocks, isItTrue) {
  blocks.forEach(function (item) {
    item.disabled = isItTrue;
  });
}

/**
* @param {object} coords
*/

function getAddress(coords) {
  adressContainer.value = coords.x + ' , ' + coords.y;
}

function getCoords() {
  return {
    x: parseInt(pinMain.style.left, 10) + Math.round(window.consts.pinMainWidth / 2),
    y: parseInt(pinMain.style.top, 10) + (isMapActive() ? window.consts.pinMainHeigth + window.consts.pinMainNib : Math.round(window.consts.pinMainHeigth / 2))
  };
}

function isMapActive() {
  return !map.classList.contains('map--faded');
}

function activatePage() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  changeDisabledState(formBlocks, false);
  getAddress(getCoords());
}

function checkRoomsCapacityValue(roomsValue, capacityValue) {
  if (roomsValue === '1' && capacityValue === '1') {
    roomsNumber.setCustomValidity('');
    return true;
  } else if (roomsValue === '2' && (capacityValue < '3' && capacityValue > '0')) {
    roomsNumber.setCustomValidity('');
    return true;
  } else if (roomsValue === '3' && (capacityValue <= '3' && capacityValue > '0')) {
    roomsNumber.setCustomValidity('');
    return true;
  } else if (roomsValue === '100' && capacityValue === '0') {
    roomsNumber.setCustomValidity('');
    return true;
  } else {
    roomsNumber.setCustomValidity('Количество комнат ' + '(' + roomsValue + ') ' + 'не подходит для ' + capacityValue + ' гостей');
    return false;
  }
}

changeDisabledState(formBlocks, true);
getAddress(getCoords());
