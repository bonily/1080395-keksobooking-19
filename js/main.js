'use strict';

var number = 8;
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkTimes = ['12:30', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ads = createAds();
var map = document.querySelector('.map');
var pinsListElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var pinsList = createPinsList(ads);
// var cardTemplate = document.querySelector('#card')
//     .content
//     .querySelector('.map__card');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adSubmit = adForm.querySelector('.ad-form__submit');
// var roomsNumber = adForm.querySelector('#room_number');
// var capacitySelection = adForm.querySelector('#capacity');
var formBlocks = adForm.querySelectorAll('fieldset');
var adressContainer = adForm.querySelector('#address');


var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGTH = 84;
var ENTER_KEY = 'Enter';


adSubmit.addEventListener('click', function (evt) {
  var roomsNumber = adForm.querySelector('#room_number');
  var capacitySelection = adForm.querySelector('#capacity');
  if (!checkRoomsCapacityValue(roomsNumber.value, capacitySelection.value)) {
    evt.preventDefault();
    console.log(roomsNumber.value);
    roomsNumber.setCustomValidity('жизнь боль');
    alert('ghfd');

  }
});

function checkRoomsCapacityValue(roomsValue, capacityValue) {
  if (roomsValue === '1' && capacityValue === '1') {
    return true;
  } else {
    return false;
  }
}


// roomsNumber.addEventListener('change', function (evt) {
//   var roomsValue = evt.target.value;
// if ( roomsValue === '1') {
//   console.log('fghjkjhg');
// }
// })

//adForm.classList.add('ad-form--disabled');
//inactiveState(formBlocks);
adressContainer.value = getAdress(pinMain);

function inactiveState(blocks) {
  blocks.forEach(function (item) {
    return item.setAttribute('disabled', 'disabled');
  });
}

function activeState(blocks) {
  blocks.forEach(function (item) {
    return item.removeAttribute('disabled', 'disabled');
  });
}

function getAdress(pin) {
  return (parseInt(pin.style.left, 10) + PIN_MAIN_WIDTH / 2) + ' , ' + (parseInt(pin.style.top, 10) + PIN_MAIN_HEIGTH);
}

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    activeState(formBlocks);
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    activeState(formBlocks);
  }
});

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(array) {
  var swapLength = getRandomInteger(1, array.length);
  var randomResult = [];
  for (var j = 0; j < swapLength; j++) {
    randomResult.push(array[j]);
  }
  return randomResult;
}

function createAds() {
  var result = [];
  for (var i = 0; i < number; i++) {
    result.push(createAd(i + 1));
  }
  return result;
}

function createAd(avatarNumber) {
  return {
    author: {
      avatar: 'img/avatars/user' + '0' + avatarNumber + '.png'
    },
    offer: {
      title: 'Объект ' + avatarNumber,
      address: getRandomInteger(0, 1200) + ',' + getRandomInteger(150, 1800),
      price: getRandomInteger(0, 10000),
      type: types[getRandomInteger(0, 3)],
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 10),
      checkin: checkTimes[getRandomInteger(0, 2)],
      checkout: checkTimes[getRandomInteger(0, 2)],
      features: getRandomArray(features),
      description: 'Объект ' + avatarNumber,
      photos: getRandomArray(photos)
    },

    location: {
      x: getRandomInteger(0, 1200),
      y: getRandomInteger(130, 650)
    }
  };
}

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

function renderPins() {
  var pinsContainer = document.createDocumentFragment();
  for (var i = 0; i < pinsList.length; i++) {
    pinsContainer.appendChild(pinsList[i]);
  }
  return pinsContainer;
}

pinsListElement.appendChild(renderPins());

// function createAdCard(currentAd) {
//   var adCard = cardTemplate.cloneNode(true);
//   adCard.querySelector('.popup__title').textContent = currentAd.offer.title;
//   adCard.querySelector('.popup__text--address').textContent = currentAd.offer.address;
//   adCard.querySelector('.popup__text--price').textContent = currentAd.offer.price + '₽/ночь';
//   adCard.querySelector('.popup__type').textContent = getAdType(currentAd);
//   adCard.querySelector('.popup__text--capacity').textContent = currentAd.offer.rooms + ' комнаты для ' + currentAd.offer.rooms + ' гостей';
//   adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentAd.offer.checkin + ' выезд до ' + currentAd.offer.checkout;
//
//   var featuresPlace = adCard.querySelector('.popup__features');
//   featuresPlace.innerHTML = '';
//   featuresPlace.appendChild(createFeaturesList(currentAd.offer.features));
//
//   adCard.querySelector('.popup__description').textContent = currentAd.offer.description;
//   var photoPlace = adCard.querySelector('.popup__photos');
//   var adPhotoTemplate = adCard.querySelector('.popup__photo');
//   photoPlace.appendChild(createPhotosList(currentAd.offer.photos, adPhotoTemplate));
//
//   photoPlace.removeChild(adCard.querySelector('.popup__photo'));
//   adCard.querySelector('.popup__avatar').src = currentAd.author.avatar;
//   return adCard;
// }
//
// function getAdType(ad) {
//   switch (ad.offer.type) {
//     case 'palace':
//       return 'Дворец';
//     case 'flat':
//       return 'Квартира';
//     case 'bungalo':
//       return 'Бунгало';
//     case 'house':
//       return 'Дом';
//     default:
//       return '';
//   }
// }
//
// function createFeaturesList(featuresList) {
//   var featuresContainer = document.createDocumentFragment();
//   for (var i = 0; i < featuresList.length; i++) {
//     var currentFearureName = 'popup__feature--' + featuresList[i];
//     var currentFearure = document.createElement('li');
//     currentFearure.className = 'popup__feature' + ' ' + currentFearureName;
//     featuresContainer.appendChild(currentFearure);
//   }
//   return featuresContainer;
// }
//
// function createPhotosList(photosList, photoTemplate) {
//   var photosContainer = document.createDocumentFragment();
//   for (var j = 0; j < photosList.length; j++) {
//     var adPhoto = photoTemplate.cloneNode(true);
//     adPhoto.src = photosList[j];
//     adPhoto.classList.remove('popup__photo');
//     adPhoto.classList.add('popup__photo' + j);
//     photosContainer.appendChild(adPhoto);
//   }
//   return photosContainer;
// }
//
// document.querySelector('.map').insertBefore(createAdCard(ads[0]), document.querySelector('.map__filters-container'));
