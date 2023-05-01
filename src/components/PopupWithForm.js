import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor({ popupSelector, submitFunction, formSetting }) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._inputList = this._popup.querySelectorAll(formSetting.inputSelector);
        this._popupForm = this._popup.querySelector(formSetting.formSelector);
        this._activeButtoninfo = this._popup.querySelector(formSetting.submitButtonSelector)
        this._buttonText = this._popup.querySelector(formSetting.submitButtonSelector).textContent
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
        });
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }

    stillWaiting(loading) {
        if(loading) {
            this._activeButtoninfo.textContent = 'Сохранение...';
        } else {
            this._activeButtoninfo.textContent = this._buttonText;
        }
};

    setEventListeners() {
        this._popupForm.addEventListener('submit', () => {
            this._submitFunction(this._getInputValues());
        });
        super.setEventListeners();
    }
}