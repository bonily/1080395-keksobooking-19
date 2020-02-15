'use strict';

(function () {
  var adsAmount = 8;
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkTimes = ['12:30', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  function createAds() {
    var result = [];
    for (var i = 0; i < adsAmount; i++) {
      result.push(createAd(i + 1));
    }
    return result;
  }

  function createAd(adNumber) {
    return {
      author: {
        avatar: 'img/avatars/user' + '0' + adNumber + '.png'
      },
      offer: {
        title: 'Объект ' + adNumber,
        address: window.utils.getRandomInteger(0, 1200) + ',' + window.utils.getRandomInteger(150, 1800),
        price: window.utils.getRandomInteger(0, 10000),
        type: types[window.utils.getRandomInteger(0, 3)],
        rooms: window.utils.getRandomInteger(1, 5),
        guests: window.utils.getRandomInteger(1, 10),
        checkin: checkTimes[window.utils.getRandomInteger(0, 2)],
        checkout: checkTimes[window.utils.getRandomInteger(0, 2)],
        features: window.utils.getRandomArray(features),
        description: 'Объект ' + adNumber,
        photos: window.utils.getRandomArray(photos)
      },

      location: {
        x: window.utils.getRandomInteger(0, 1200),
        y: window.utils.getRandomInteger(130, 650)
      }
    };
  }

  window.data = {
    create: createAds
  };

})();
