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
var adTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var currentAd = ads[0];


map.classList.remove('map--faded');

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

function createAdCard() {
  var adCard = adTemplate.cloneNode(true);
  adCard.querySelector('.popup__title').textContent = currentAd.offer.title;
  adCard.querySelector('.popup__text--address').textContent = currentAd.offer.address;
  adCard.querySelector('.popup__text--price').textContent = currentAd.offer.price + '₽/ночь';
  switch (currentAd.offer.address) {
    case 'palace':
      adCard.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'flat':
      adCard.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalo':
      adCard.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      adCard.querySelector('.popup__type').textContent = 'Дом';
      break;
  }
  adCard.querySelector('.popup__text--capacity').textContent = currentAd.offer.rooms + ' комнаты для ' + currentAd.offer.rooms + ' гостей';
  adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentAd.offer.checkin + ' выезд до ' + currentAd.offer.checkout;
  for (var i = 0; i < currentAd.offer.features.length; i++) {
    var currentFearureName = createFullFeatureName(currentAd.offer.features[i]);
    switch (currentFearureName) {
      case 'popup__feature--wifi':
        adCard.querySelector('.popup__feature--wifi').textContent = 'Wi-Fi';
        break;
      case 'popup__feature--dishwasher':
        adCard.querySelector('.popup__feature--dishwasher').textContent = 'Посудомоечная машина';
        break;
      case 'popup__feature--parking':
        adCard.querySelector('.popup__feature--parking').textContent = 'Парковка';
        break;
      case 'popup__feature--washer':
        adCard.querySelector('.popup__feature--washer').textContent = 'Стиральная машина';
        break;
      case 'popup__feature--elevator':
        adCard.querySelector('.popup__feature--elevator').textContent = 'Лифт';
        break;
      case 'popup__feature--conditioner':
        adCard.querySelector('.popup__feature--conditioner').textContent = 'Кондиционер';
        break;
    }
  }
  adCard.querySelector('.popup__description').textContent = currentAd.offer.description;
  var photoPlace = adCard.querySelector('.popup__photos');
  var adPhotoTemplate = adCard.querySelector('.popup__photo');
  for (var j = 0; j < currentAd.offer.photos.length; j++) {
    var adPhoto = adPhotoTemplate.cloneNode(true);
    adPhoto.src = currentAd.offer.photos[j];
    adPhoto.classList.remove('popup__photo');
    adPhoto.classList.add('popup__photo' + j);
    photoPlace.appendChild(adPhoto);
  }
  photoPlace.removeChild(adCard.querySelector('.popup__photo'));
  adCard.querySelector('.popup__avatar').src = currentAd.author.avatar;

  return adCard;
}

function createFullFeatureName(obj) {
  return 'popup__feature--' + obj;
}

document.querySelector('.map').insertBefore(createAdCard(), document.querySelector('.map__filters-container'));
