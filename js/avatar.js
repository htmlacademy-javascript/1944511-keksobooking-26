const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = './img/muffin-grey.svg';
const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const filePhotoHome = document.querySelector('.ad-form__input');
const previewPhotoHome = document.querySelector('.ad-form__photo');

function uploadFileAvatar () {
  fileAvatar.addEventListener('change', () => {
    const file = fileAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
}

function uploadFileHome () {
  filePhotoHome.addEventListener('change', () => {
    const file = filePhotoHome.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches && previewPhotoHome.children.length < 3) {
      const imgPhoto = document.createElement('img');
      imgPhoto.style.width = '100px';
      imgPhoto.style.height = '70px';
      imgPhoto.src = URL.createObjectURL(file);
      previewPhotoHome.appendChild(imgPhoto);
    }
  });
}

function clearImgPreview () {
  previewAvatar.src = DEFAULT_AVATAR;
  previewPhotoHome.innerHTML = '';
}

uploadFileAvatar();
uploadFileHome();

export { clearImgPreview };
