'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var messagePlace = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  function successMessagePlace() {
    return document.querySelector('.success');
  }

  var onMessageKeydown = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      successMessagePlace().remove();
      document.removeEventListener('keydown', onMessageKeydown);
      document.removeEventListener('click', onMessageClick);

    }
  };

  var onMessageClick = function () {
    successMessagePlace().remove();
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageKeydown);
  };

  // function onTextMessageClick(evt) {
  //   var messageText = document.querySelector('.success__message');
  //   messageText.addEventListener('click', function () {
  //     evt.preventDefault();
  //     evt.stopPropagation();
  //   });
  // }


  function setErrorClickHandler(errorButton) {
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      successMessagePlace().remove();
    });
  }

  function setMessageTextHandler() {
    var messageText = document.querySelector('.success__message');
    messageText.addEventListener('click', function (evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
    });
  }

  function addSuccessMessage() {
    var successMessage = successMessageTemplate.cloneNode(true);
    document.addEventListener('keydown', onMessageKeydown);
    document.addEventListener('click', onMessageClick);
    messagePlace.appendChild(successMessage);
    setMessageTextHandler();
  }

  function addErrorMessage() {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');
    setErrorClickHandler(errorButton);
    document.addEventListener('keydown', onMessageKeydown);
    document.addEventListener('click', onMessageClick, true);
    messagePlace.appendChild(errorMessage);
  }
  window.messages = {
    addSuccessMessage: addSuccessMessage,
    addErrorMessage: addErrorMessage
  };

})();
