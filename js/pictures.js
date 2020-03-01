'use strict';

(function () {
  var wasteDiv = document.querySelector('.ad-form__photo');
  var avatarFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var adPhotoFileChooser = document.querySelector('.ad-form__upload');


  function setFileSelectHandler(evt, preview) {
    var fileChooser = evt.currentTarget;

    var files = evt.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var currentIndex = i;
      var fileName = file.name.toLowerCase();

      var matches = window.consts.FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (fileChooser === adPhotoFileChooser) {
            if (currentIndex === 0) {
              wasteDiv.remove();
            }
            createNewAdPhoto(file, fileName, reader);
          } else {
            preview.src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      }
    }
  }

  function createNewAdPhoto(file, fileName, reader) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    var img = document.createElement('img');
    img.src = reader.result;
    img.title = fileName;
    img.width = 70;
    img.height = 70;
    div.appendChild(img);
    adFormPhotoContainer.insertBefore(div, adFormPhotoContainer.lastChild);
  }

  adPhotoFileChooser.addEventListener('change', setFileSelectHandler);
  avatarFileChooser.addEventListener('change', function (evt) {
    setFileSelectHandler(evt, avatarPreview);
  });
})();
