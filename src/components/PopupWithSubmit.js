import { Popup } from "./Popup.js";
import { formSetting } from "../consts/consts.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._form = this._popup.querySelector(formSetting.formSelector);
    }

  setHandleDeleteClick(handleDeleteCard) {
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
        this._handleDeleteCard();
    });
    super.setEventListeners();
  }
}