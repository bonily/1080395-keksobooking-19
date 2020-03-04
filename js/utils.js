'use strict';

(function () {

  window.changeDisabledState = function (blocks, isItTrue) {
    blocks.forEach(function (item) {
      item.disabled = isItTrue;
    });
  };
})();
