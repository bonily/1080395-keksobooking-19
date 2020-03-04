'use strict';

(function () {
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilters = mapFilterForm.querySelectorAll('.map__filter');
  var type = mapFilterForm.querySelector('#housing-type');
  var price = mapFilterForm.querySelector('#housing-price');
  var rooms = mapFilterForm.querySelector('#housing-rooms');
  var guests = mapFilterForm.querySelector('#housing-guests');


  function setChangeCallback(cb) { // принимает массив с сервера из main и cb функцию рендера пинов
    mapFilterForm.addEventListener('change', function () {
      cb();
    });
  }

  function filterInvalidAds(data) {
    return data.filter(function (ad) {
      return ad.hasOwnProperty(window.consts.AD_PROPERTY_TO_CHECK);
    });
  }


  function filterByValue(data) {
    var result = data.filter(function (ad) {
      return filterByType(type.value, ad) && filterByPrice(price.value, ad) && filterByRooms(rooms.value, ad) && filterByGuests(guests.value, ad) && filterByFeatures(ad);
    });
    if (result.length > window.consts.PINS_QUANTITY) {
      result = filterByQuantity(result);
    }
    return result;
  }

  function filterByFeatures(ad) {
    var features = mapFilterForm.querySelectorAll('.map__checkbox:checked');
    var checkedValues = Array.from(features).map(function (el) {
      return el.value;
    });
    return checkedValues.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  }

  function filterByGuests(value, ad) {
    return value === 'any' || ad.offer.guests === parseInt(value, 10);
  }

  function filterByRooms(value, ad) {
    return value === 'any' || ad.offer.rooms === parseInt(value, 10);
  }

  function filterByType(value, ad) {
    return value === 'any' || ad.offer.type === value;
  }

  function filterByPrice(value, ad) {
    switch (value) {
      case 'middle':
        return ad.offer.price >= 10000 && ad.offer.price <= 50000;
      case 'low':
        return ad.offer.price < 10000;
      case 'high':
        return ad.offer.price > 50000;
      default: return ad;
    }
  }

  function filterByQuantity(data) {
    return data.slice(0, window.consts.PINS_QUANTITY);
  }

  function activateFilters() {
    window.changeDisabledState(mapFilters, false);
  }

  function deactivateFilters() {
    mapFilterForm.reset();
    window.changeDisabledState(mapFilters, true);
  }

  deactivateFilters();


  window.filter = {
    activate: activateFilters,
    deactivate: deactivateFilters,
    getData: filterByValue,
    setChangeCallback: setChangeCallback,
    filterInvalidAds: filterInvalidAds
  };


})();
