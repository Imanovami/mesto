import Popup from "./Popup.js";
import {popupPhotoTitle, popupBigPhoto} from "./utils.js";

export default class PopupWithImage extends Popup{
    constructor(link, name, selectorPopup) {
        super(selectorPopup)
        this._element = document.querySelector(selectorPopup)
        this._link = link;
        this._name = name;
    }


    open() {

        this._element.classList.add('popup_opened');
        window.addEventListener('keydown', this._handleEscClose)
        document.querySelector('.popup__image-big').src = this._link;
        popupPhotoTitle.textContent = this._name;
        popupBigPhoto.alt = this._name;
    }
}
