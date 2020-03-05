'use strict';


(function () {
  var adTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  function createAd(adInfo) {
    var adForMap = adTemplate.cloneNode(true);
    var featuresPlace = adForMap.querySelector('.popup__features');
    var photoPlace = adForMap.querySelector('.popup__photos');
    var adPhotoTemplate = adForMap.querySelector('.popup__photo');
    adForMap.querySelector('.popup__title').textContent = adInfo.offer.title;
    adForMap.querySelector('.popup__text--address').textContent = adInfo.offer.address;
    adForMap.querySelector('.popup__text--price').textContent = adInfo.offer.price + '₽/ночь';
    adForMap.querySelector('.popup__type').textContent = getAdType(adInfo);
    adForMap.querySelector('.popup__text--capacity').textContent = adInfo.offer.rooms + ' комнаты для ' + adInfo.offer.guests + ' гостей';
    adForMap.querySelector('.popup__text--time').textContent = 'Заезд после ' + adInfo.offer.checkin + ' выезд до ' + adInfo.offer.checkout;

    featuresPlace.innerHTML = '';
    featuresPlace.appendChild(createFeaturesList(adInfo.offer.features));

    adForMap.querySelector('.popup__description').textContent = adInfo.offer.description;
    photoPlace.appendChild(createPhotosList(adInfo.offer.photos, adPhotoTemplate));

    photoPlace.removeChild(adForMap.querySelector('.popup__photo'));
    adForMap.querySelector('.popup__avatar').src = adInfo.author.avatar;
    return adForMap;
  }

  function getAdType(ad) {
    switch (ad.offer.type) {
      case 'palace':
        return 'Дворец';
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      default:
        return '';
    }
  }

  function createFeaturesList(features) {
    var featuresContainer = document.createDocumentFragment();
    features.forEach(function (feature) {
      var currentFeatureName = 'popup__feature--' + feature;
      var currentFeature = document.createElement('li');
      currentFeature.className = 'popup__feature' + ' ' + currentFeatureName;
      featuresContainer.appendChild(currentFeature);
    });
    return featuresContainer;
  }

  function createPhotosList(photos, photoTemplate) {
    var photosContainer = document.createDocumentFragment();
    photos.forEach(function (photo, i) {
      var adPhoto = photoTemplate.cloneNode(true);
      adPhoto.src = photo;
      adPhoto.classList.remove('popup__photo');
      adPhoto.classList.add('popup__photo' + '-' + i);
      photosContainer.appendChild(adPhoto);
    });
    return photosContainer;
  }


  window.createAd = createAd;

})();
