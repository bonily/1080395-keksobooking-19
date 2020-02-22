'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
  var messagePlace = document.querySelector('main');
  var errorMessageTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  function keydownHandler(evt) {
    if (evt.key === window.consts.ESC_KEY) {
      messagePlace.removeChild(messagePlace.lastChild);
    }
  }

  function onClickRemoveHandler(evt) {
    if (evt.target.tagName === 'P') {
      evt.preventDefault();
      evt.stopPropagation();
    } else {
      messagePlace.removeChild(messagePlace.lastChild);
    }
  }


  function onErrorButtonClick(errorButton) {
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      messagePlace.removeChild(messagePlace.lastChild);
    });
  }

  function addSuccessMessage() {
    var successMessage = successMessageTemplate.cloneNode(true);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', onClickRemoveHandler, true);
    messagePlace.appendChild(successMessage);
  }

  function addErrorMessage() {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    var errorButton = errorMessage.querySelector('.error__button');
    onErrorButtonClick(errorButton);
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', onClickRemoveHandler, true);
    messagePlace.appendChild(errorMessage);
  }
  window.messages = {
    addSuccessMessage: addSuccessMessage,
    addErrorMessage: addErrorMessage
  };

})();
