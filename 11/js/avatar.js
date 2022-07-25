const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = './img/muffin-grey.svg';
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

  if (matches && previewPhotoHome.children.length < 6) {
    const imgPhoto = document.createElement('img');
    imgPhoto.style.width = '90px';
    imgPhoto.style.margin = '5px';
    imgPhoto.src = URL.createObjectURL(file);
    previewPhotoHome.appendChild(imgPhoto);
  }
});

function clearImgPreview () {
  previewAvatar.src = DEFAULT_AVATAR;
  previewPhotoHome.innerHTML = '';
}

export { clearImgPreview };
