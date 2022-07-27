const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = './img/muffin-grey.svg';
const AMOUNT_PREVIEW_PHOTO_HOME = 6;
const IMAGE_SIZES = {
  width: '90px',
  margin: '5px'
};
const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const filePhotoHome = document.querySelector('.ad-form__input');
const previewPhotoHome = document.querySelector('.ad-form__photo');

fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

filePhotoHome.addEventListener('change', () => {
  const file = filePhotoHome.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
  if (matches && previewPhotoHome.children.length < AMOUNT_PREVIEW_PHOTO_HOME) {
    const imgPhoto = document.createElement('img');
    imgPhoto.style.width = IMAGE_SIZES.width;
    imgPhoto.style.margin = IMAGE_SIZES.margin;
    imgPhoto.src = URL.createObjectURL(file);
    previewPhotoHome.appendChild(imgPhoto);
  }
});

/**  Функция, очищает поле превью аватар и фото жилья */
const clearImgPreview = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewPhotoHome.innerHTML = '';
};

export { clearImgPreview };
