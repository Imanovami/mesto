import Popup from "./Popup.js";
import {popupPhotoTitle, popupBigPhoto} from "../utils/utils.js";

export default class PopupWithImage extends Popup{
    constructor(selectorPopup) {
        super(selectorPopup)
        this._element = document.querySelector(selectorPopup)
    }

    open(elm) {
        super.open(elm)
        document.querySelector('.popup__image-big').src = elm.src;
        popupPhotoTitle.textContent = elm.alt;
        popupBigPhoto.alt = elm.alt;
    }
}
