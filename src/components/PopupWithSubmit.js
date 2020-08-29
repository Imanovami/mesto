
import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
    }

    open() {
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();
        this._element.querySelector('.popup__form').addEventListener('submit', (evt) => {
           evt.preventDefault();

             if(this._handleFormSubmit) {
                 this._handleFormSubmit();
            }
        })
    }
     setSubmitHandler(handler) {
        this._handleFormSubmit = handler;
     }

    close() {
        super.close()
    }
}

