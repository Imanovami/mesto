import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({selectorPopup, handleFormSubmit}) {
        super(selectorPopup);
        this._element = document.querySelector(selectorPopup);
        this._handleFormSaubmit = handleFormSubmit;
    }

    _getInputValues() {
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }


    setEventListeners() {
        super.setEventListeners()
        this._form = this._element.querySelector('.popup__form')
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues()
            this._handleFormSaubmit(data)
        })
    }
    close() {
        super.close()
        this._form.reset();
    }
}