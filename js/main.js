'use strict';

var numbersArray = [1, 2, 3, 4, 5, 6, 7, 8];
var typeArray = ['palace', 'flat', 'house', 'bungalo'];
var checkArray = ['12:30', '13:00', '14:00'];
var featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var objectsArray = createArray();
var map = document.querySelector('.map');
var pinsListElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

map.classList.remove('map--faded');

function getRandomFloat(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(array) {
  var swapLength = getRandomFloat(1, array.length);
  var randomArray = [];
  for (var j = 0; j < swapLength; j++) {
    randomArray.push(array[j]);
  }
  return randomArray;
}

function createArray() {
  var swapArray = [];
  for (var i = 0; i < numbersArray.length; i++) {
    swapArray.push(createObject(numbersArray[i], numbersArray[i], getRandomFloat(0, 1200), getRandomFloat(150, 1800), getRandomFloat(0, 10000), typeArray[getRandomFloat(0, 3)], getRandomFloat(1, 5), getRandomFloat(1, 10), checkArray[getRandomFloat(0, 2)], checkArray[getRandomFloat(0, 2)], getRandomArray(featuresArray), numbersArray[i], getRandomArray(photosArray), getRandomFloat(0, 1200), getRandomFloat(130, 650)));
  }
  return swapArray;
}

function createObject(avatarNumber, title, addressX, addressY, price, type, rooms, guests, checkin, checkout, features, description, photos, locationX, locationY) {
  return {
    'author': {
      'avatar': 'img/avatars/user' + '0' + avatarNumber + '.png'
    },
    'offer': {
      'title': 'Объект ' + title,
      'address': addressX + ',' + addressY,
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin,
      'checkout': checkout,
      'features': features,
      'description': 'Объект ' + description,
      'photos': photos
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
}

for (var r = 0; r < 8; r++) {
  var pinsElement = pinsTemplate.cloneNode(true);
  pinsListElement.appendChild(pinsElement);
  pinsElement.querySelector('img').src = objectsArray[r].author.avatar;
  pinsElement.querySelector('img').alt = objectsArray[r].offer.title;
  pinsElement.style.left = objectsArray[r].location.x + 25 + 'px';
  pinsElement.style.top = objectsArray[r].location.y - 70 + 'px';
}
