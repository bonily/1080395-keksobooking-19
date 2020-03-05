'use strict';
(function () {

  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, window.consts.DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = debounce;
})();
