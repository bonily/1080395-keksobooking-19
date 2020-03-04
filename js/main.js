'use strict';

(function () {

  /**
 * Будет принимать сообщение об ошибке и передавать его дальше в шаблон???
 * @param {string} message
 */
  function onError() {
    window.map.setMainPinClick(activatePage);
  }
  var onChangeFilter = function (data) {
    var filteredData = window.filter.getData(data);
    window.map.renderPins(filteredData);
  };

  function activatePage() {
    window.request.fetchAds('https://js.dump.academy/keksobooking/data',
        function (data) {
          var filteredData = window.filter.filterInvalidAds(data);
          window.map.activate();
          window.form.activate();
          window.filter.activate();
          window.map.renderPins(window.filter.getData(filteredData));

          window.filter.setChangeCallback(window.debounce(function () {
            onChangeFilter(filteredData);
          }));

          window.form.setAddress(window.map.getCoords());
        }
        , onError);
  }

  function submitForm() {
    window.request.uploadForm('https://js.dump.academy/keksobooking',
        window.form.getData(),
        function () {
          window.form.getAd.reset();
          deativatePage();
          window.messages.addSuccessMessage();
        }, window.messages.addErrorMessage);
  }


  function deativatePage() {
    window.map.removeAd();
    window.form.deactivate();
    window.map.deactivate();
    window.filter.deactivate();
    window.map.setMainPinClick(activatePage);
    window.form.setAddress(window.map.getCoords());
  }

  function setNewAddress() {
    window.form.setAddress(window.map.getCoords());
  }


  window.form.deactivate();
  window.map.deactivate();
  setNewAddress();
  window.map.setMainPinClick(activatePage);
  window.map.setMainPinMove(setNewAddress);
  window.form.setResetButtonClick(deativatePage);
  window.form.setSubmitAdClick(submitForm);


})();
