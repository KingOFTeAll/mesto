import { Popup } from '../Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupCaption = this._popup.querySelector('.ImgMax-container__caption');
        this._popupImage = this._popup.querySelector('.ImgMax-container__Img');
    }


    showPopupImgCard(cardData) {
        console.log(cardData);
        this._popupImage.src = cardData.link;
        this._popupImage.alt = `${cardData.name}.`;
        this._popupCaption.textContent = cardData.name;
      
        super.openPopup();
      }
}