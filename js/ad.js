'use strict';


(function () {
  var adTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  function createAd(currentAd) {
    var ad = adTemplate.cloneNode(true);
    var featuresPlace = ad.querySelector('.popup__features');
    var photoPlace = ad.querySelector('.popup__photos');
    var adPhotoTemplate = ad.querySelector('.popup__photo');
    ad.querySelector('.popup__title').textContent = currentAd.offer.title;
    ad.querySelector('.popup__text--address').textContent = currentAd.offer.address;
    ad.querySelector('.popup__text--price').textContent = currentAd.offer.price + '₽/ночь';
    ad.querySelector('.popup__type').textContent = getAdType(currentAd);
    ad.querySelector('.popup__text--capacity').textContent = currentAd.offer.rooms + ' комнаты для ' + currentAd.offer.rooms + ' гостей';
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentAd.offer.checkin + ' выезд до ' + currentAd.offer.checkout;

    featuresPlace.innerHTML = '';
    featuresPlace.appendChild(createFeaturesList(currentAd.offer.features));

    ad.querySelector('.popup__description').textContent = currentAd.offer.description;
    photoPlace.appendChild(createPhotosList(currentAd.offer.photos, adPhotoTemplate));

    photoPlace.removeChild(ad.querySelector('.popup__photo'));
    ad.querySelector('.popup__avatar').src = currentAd.author.avatar;
    return ad;
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

  function createFeaturesList(featuresList) {
    var featuresContainer = document.createDocumentFragment();
    for (var i = 0; i < featuresList.length; i++) {
      var currentFearureName = 'popup__feature--' + featuresList[i];
      var currentFearure = document.createElement('li');
      currentFearure.className = 'popup__feature' + ' ' + currentFearureName;
      featuresContainer.appendChild(currentFearure);
    }
    return featuresContainer;
  }

  function createPhotosList(photosList, photoTemplate) {
    var photosContainer = document.createDocumentFragment();
    for (var j = 0; j < photosList.length; j++) {
      var adPhoto = photoTemplate.cloneNode(true);
      adPhoto.src = photosList[j];
      adPhoto.classList.remove('popup__photo');
      adPhoto.classList.add('popup__photo' + j);
      photosContainer.appendChild(adPhoto);
    }
    return photosContainer;
  }

  window.ad = createAd;

})();
