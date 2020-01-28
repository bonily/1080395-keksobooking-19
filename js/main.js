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

function createPinsList(adsList) {
  return adsList.map(function createPin(obj) {
    var pinsElement = pinsTemplate.cloneNode(true);
    pinsElement.querySelector('img').src = obj.author.avatar;
    pinsElement.querySelector('img').alt = obj.offer.title;
    pinsElement.style.left = obj.location.x + 25 + 'px';
    pinsElement.style.top = obj.location.y - 70 + 'px';
    return pinsElement;
  });
}

for (var i = 0; i < pinsList.length; i++) {
  pinsListElement.appendChild(pinsList[i]);
}
