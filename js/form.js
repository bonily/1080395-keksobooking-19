'use strict';

(function () {


  var adForm = document.querySelector('.ad-form');
  var adSubmit = adForm.querySelector('.ad-form__submit');
  var adReset = adForm.querySelector('.ad-form__reset');
  var roomNumber = adForm.querySelector('#room_number');
  var capacitySelection = adForm.querySelector('#capacity');
  var formBlocks = adForm.querySelectorAll('fieldset');
  var addressContainer = adForm.querySelector('#address');
  var adPrice = adForm.querySelector('#price');
  var adHomeType = adForm.querySelector('#type');
  var adTime = adForm.querySelector('.ad-form__element--time');
  var adTimeCheckIn = adTime.querySelector('#timein');
  var adTimeCheckOut = adTime.querySelector('#timeout');


  adSubmit.addEventListener('click', function () {
    checkRoomsCapacityValue(roomNumber.value, capacitySelection.value);
  });

  adForm.classList.add('ad-form--disabled');

  adTime.addEventListener('change', function (evt) {
    setTime(evt.target.name, evt.target.value);
  });
  adHomeType.addEventListener('change', function () {
    setMinPrice();
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

  /**
  * @param {object} coords
  */

  function setAddress(coords) {
    addressContainer.value = coords.x + ' , ' + coords.y;
  }


  function checkRoomsCapacityValue(roomsValue, capacityValue) {
    if (roomsValue === '1' && capacityValue === '1') {
      roomNumber.setCustomValidity('');
      return true;
    } else if (roomsValue === '2' && (capacityValue < '3' && capacityValue > '0')) {
      roomNumber.setCustomValidity('');
      return true;
    } else if (roomsValue === '3' && (capacityValue <= '3' && capacityValue > '0')) {
      roomNumber.setCustomValidity('');
      return true;
    } else if (roomsValue === '100' && capacityValue === '0') {
      roomNumber.setCustomValidity('');
      return true;
    } else {
      roomNumber.setCustomValidity('Количество комнат ' + '(' + roomsValue + ') ' + 'не подходит для ' + capacityValue + ' гостей');
      return false;
    }
  }

  function activateForm() {
    adForm.classList.remove('ad-form--disabled');
    window.changeDisabledState(formBlocks, false);
  }

  function deactivateForm() {
    adForm.classList.add('ad-form--disabled');
    window.changeDisabledState(formBlocks, true);
    adPrice.placeholder = 5000;
  }


  window.form = {
    setAddress: setAddress,
    activate: activateForm,
    deactivate: deactivateForm,
    getData: function () {
      return new FormData(adForm);
    },
    getAd: adForm,
    setResetButtonClick: function (cb) {
      adReset.addEventListener('click', function (evt) {
        evt.preventDefault();
        adForm.reset();
        window.resetPictures();
        cb();
      });
    },

    setSubmitAdClick: function (cb) {
      adForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        window.resetPictures();
        cb();
      });
    }
  };
})();
