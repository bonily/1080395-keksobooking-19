'use strict';

(function () {

  function changeDisabledState(blocks, isItTrue) {
    blocks.forEach(function (item) {
      item.disabled = isItTrue;
    });
  }

  window.changeDisabledState = changeDisabledState;
})();
