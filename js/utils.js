'use strict';

(function () {

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function getRandomArray(array) {
    var swapLength = window.utils.getRandomInteger(1, array.length);
    var randomResult = [];
    for (var j = 0; j < swapLength; j++) {
      randomResult.push(array[j]);
    }
    return randomResult;
  }

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomArray: getRandomArray
  };
})();
