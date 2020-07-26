import {popupOpen,popupPhotoTitle, popupBigPhoto, popupPhoto} from "./utils.js";
export class Card {
    constructor(data, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__photo').alt = this._name
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () =>  {
            this._handleLikeIcon();
        });
        this._element.querySelector('.element__trash').addEventListener('click', () =>  {
            this._handleTrashIcon();
        });

        this._element.querySelector('.element__photo').addEventListener('click', () =>  {
            this._openBigPhoto();
        });
    }

    _handleLikeIcon() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active')
    };

    _handleTrashIcon () {
        this._element.closest('li').remove()
    };

    _openBigPhoto () {
        popupOpen(document.querySelector('.popup_type_photo'));
        document.querySelector('.popup__image-big').src = this._link;
        popupPhotoTitle.textContent = this._name;
        popupBigPhoto.alt = this._name;
    };
}

