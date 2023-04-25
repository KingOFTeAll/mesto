import { Popup } from '../Popup'
import { formSetting } from '../../../consts/consts.js'

export class PopupWithForm extends Popup {
    constructor({ popupSelector, submitFunction }) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._inputList = this._popup.querySelectorAll(formSetting.inputSelector);
        this._popupForm = this._popup.querySelector(formSetting.formSelector);
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
          console.log(input.name, data);
        });
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', () => {
            this._submitFunction(this._getInputValues());
        });
        super.setEventListeners();
    }
}