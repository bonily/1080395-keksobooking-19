'use strict';

(function () {
  var avatarFileChooser = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');
  var adPhotoFileChooser = document.querySelector('.ad-form__upload');
  var wasteDiv = document.querySelector('.ad-form__photo');


  function onFilterChange(evt, preview) {
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
              wasteDiv.remove();
            }
            addNewAdPhotoDiv(createNewAdPhoto(fileName, reader.result));
          } else {
            preview.src = reader.result;
          }
        });

        reader.readAsDataURL(file);
      }

    });
  }


  function createNewAdPhoto(fileName, link) {
    var newPhotoDiv = createNewDiv();
    var img = document.createElement('img');
    img.src = link;
    img.title = fileName;
    img.width = 70;
    img.height = 70;
    newPhotoDiv.appendChild(img);
    return newPhotoDiv;
  }

  function addNewAdPhotoDiv(div) {
    adFormPhotoContainer. appendChild(div);
  }

  function createNewDiv() {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    return div;
  }

  function resetForm() {
    avatarPreview.src = 'img/muffin-grey.svg';
    resetAdPhotoContainer();
  }

  function resetAdPhotoContainer() {
    adFormPhotoContainer.innerHTML = '';
    adFormPhotoContainer.appendChild(adPhotoFileChooser);

    wasteDiv = createNewDiv();

    addNewAdPhotoDiv(wasteDiv);
  }

  adPhotoFileChooser.addEventListener('change', onFilterChange);

  avatarFileChooser.addEventListener('change', function (evt) {
    onFilterChange(evt, avatarPreview);
  });

  window.resetPictures = resetForm;
})();
