'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var adPhotoFileChooser = document.querySelector('.ad-form__upload');


  function setFileSelectHandler(evt, preview) {
    var fileChooser = evt.currentTarget;
    var files = Array.from(evt.target.files);

    files.forEach(function (file, i) {
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
              removeWasteDiv();
            }
            addNewAdPhoto(createNewAdPhoto(file, fileName, reader.result));
          } else {
            preview.src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      }

    });
  }

  function removeWasteDiv() {
    var wasteDiv = document.querySelector('.ad-form__photo');
    wasteDiv.remove();
  }

  function createNewAdPhoto(file, fileName, link) {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    var img = document.createElement('img');
    img.src = link;
    img.title = fileName;
    img.width = 70;
    img.height = 70;
    div.appendChild(img);
    return div;
  }

  function addNewAdPhoto(div) {
    adFormPhotoContainer.insertBefore(div, adFormPhotoContainer.lastChild);
  }

  function resetForm() {
    avatarPreview.scr = '#';
    resetAdPhotoContainer();
  }

  function resetAdPhotoContainer() {
    adFormPhotoContainer.innerHTML = '';
    adFormPhotoContainer.appendChild(adPhotoFileChooser);

    var div = document.createElement('div');
    div.classList.add('ad-form__photo');

    adFormPhotoContainer.appendChild(div);
  }

  adPhotoFileChooser.addEventListener('change', setFileSelectHandler);

  avatarFileChooser.addEventListener('change', function (evt) {
    setFileSelectHandler(evt, avatarPreview);
  });

  window.resetPictures = resetForm;
})();
