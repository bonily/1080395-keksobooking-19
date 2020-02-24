'use strict';

(function () {

  /**
 * Будет принимать сообщение об ошибке и передавать его дальше в шаблон???
 * @param {string} message
 */
  function onError() {
    window.map.setMainPinClick(activatePage);
  }

  function activatePage() {
    window.request.fetchAds('https://js.dump.academy/keksobooking/data',
        function (data) {
          window.map.activate();
          window.form.activate();
          window.map.renderPins(data);
          window.form.setAddress(window.map.getCoords());
        }
        , onError);
  }

  function submissionForm() {
    window.request.uploadForm('https://js.dump.academy/keksobooking',
        window.form.getData(),
        function () {
          window.form.ad.reset();
          deativatePage();
          window.messages.addSuccessMessage();
        }, window.messages.addErrorMessage);
  }


  function deativatePage() {
    window.map.removeAd();
    window.form.deactivate();
    window.map.deactivate();
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
  window.form.setSubmitAdClick(submissionForm);


})();
