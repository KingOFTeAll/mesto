import { openPopup } from './ind.js';

const imgMaxPopup = document.querySelector('.popup_type_ImageMax'),
      imgMaxPopupImage = imgMaxPopup.querySelector('.ImgMax-container__Img'),
      imgMaxPopupTitle = imgMaxPopup.querySelector('.ImgMax-container__caption');

function showPopupImgCard(img, caption) {
  openPopup(imgMaxPopup);

  imgMaxPopupImage.src = img;
  imgMaxPopupImage.alt = `${caption}.`;
  imgMaxPopupTitle.textContent = caption;
}

export { showPopupImgCard }