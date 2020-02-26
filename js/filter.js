'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');


  function filterAds(data, cb) { // принимает массив с сервера из main и cb функцию рендера пинов
    mapFilters.addEventListener('change', function () {
      cb(filterByValue(data));
    });
  }

  function filterByValue(data) {
    var type = mapFilters.querySelector('#housing-type');
    var price = mapFilters.querySelector('#housing-price');
    var rooms = mapFilters.querySelector('#housing-rooms');
    var guests = mapFilters.querySelector('#housing-guests');
    var features = mapFilters.querySelectorAll('.map__checkbox:checked');
    var swapAds = data;
    swapAds = filterByType(type.value, swapAds);
    swapAds = filterByPrice(price.value, swapAds);
    swapAds = filterByRooms(rooms.value, swapAds);
    swapAds = filterByGuests(guests.value, swapAds);
    swapAds = filterByFeatures(features, swapAds);
    if (swapAds.length > window.consts.PINS_QUANTITY - 1) {
      swapAds = filterByQuantity(swapAds);
    }

    return swapAds;
  }

  function filterByFeatures(features, ads) {
    var adsWithFeature = ads;
    var checkedValues = Array.from(features).map(function (el) {
      return el.value;
    });
    for (var i = 0; i < checkedValues.length; i++) {
      adsWithFeature = adsWithFeature.filter(function (el) {
        return el.offer.features.includes(checkedValues[i]);
      });
    }
    return adsWithFeature;
  }

  function filterByGuests(guests, ads) {
    if (guests === 'any') {
      return ads;
    } else {
      return ads.filter(function (el) {
        return el.offer.guests === parseInt(guests, 10);
      });
    }
  }

  function filterByRooms(rooms, ads) {
    if (rooms === 'any') {
      return ads;
    } else {
      return ads.filter(function (el) {
        return el.offer.rooms === parseInt(rooms, 10);
      });
    }
  }

  function filterByType(type, ads) {
    if (type === 'any') {
      return ads;
    } else {
      return ads.filter(function (el) {
        return el.offer.type === type;
      });
    }
  }

  function filterByPrice(value, ads) {
    switch (value) {
      case 'middle':
        return ads.filter(function (el) {
          return el.offer.price >= 10000 && el.offer.price <= 50000;
        });
      case 'low':
        return ads.filter(function (el) {
          return el.offer.price < 10000;
        });
      case 'high':
        return ads.filter(function (el) {
          return el.offer.price > 50000;
        });
      default: return ads;
    }
  }

  function filterByQuantity(data) {
    return data.slice(0, window.consts.PINS_QUANTITY);
  }


  window.filter = {
    setMapFormFilter: function (data, cb) {
      filterAds(data, cb);
    },
    setMapQuantityFilter: filterByQuantity
  };


})();
