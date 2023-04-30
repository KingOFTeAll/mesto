import { Popup } from "../Popup.js";
import { formSetting } from "../../../consts/consts.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._Form = this._popup.querySelector(formSetting.formSelector);
    }

  setHandleDeleteClick(handleDeleteCard) {
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    this._Form.addEventListener('submit', () => {
        this._handleDeleteCard();
    });
    super.setEventListeners();
  }
}