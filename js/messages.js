'use strict';

(function () {
  var successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
  var messagePlace = document.querySelector('main');
  var errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

  function messageSpot() {
    return document.querySelector('.message');
  }

  var onMessageKeydown = function (evt) {
    if (evt.key === window.consts.ESC_KEY) {
      messageSpot().remove();
      document.removeEventListener('keydown', onMessageKeydown);
      document.removeEventListener('click', onMessageClick);

    }
  };

  var onMessageClick = function () {
    messageSpot().remove();
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
      messageSpot().remove();
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
    document.addEventListener('keydown', onMessageKeydown);
    document.addEventListener('click', onMessageClick);
    messagePlace.appendChild(successMessage);
    setMessageTextHandler();
  }

  function addErrorMessage() {
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
