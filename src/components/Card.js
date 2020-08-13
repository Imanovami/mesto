export default class Card {
    constructor({data, handleCardClick}, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        const elementPhoto = this._element.querySelector('.element__photo')
        elementPhoto.src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        elementPhoto.alt = this._name
        return this._element;
    }

    _setEventListeners() {
        const elementLike = this._element.querySelector('.element__like')
        elementLike.addEventListener('click', () =>  {
            this._handleLikeIcon(elementLike);
        });

        this._element.querySelector('.element__trash').addEventListener('click', () =>  {
            this._handleTrashIcon();
        });
        const elementPhoto = this._element.querySelector('.element__photo');

        elementPhoto.addEventListener('click', () =>  {
           this._handleCardClick(elementPhoto);
        });
    }

    _handleLikeIcon(elm) {
        elm.classList.toggle('element__like_active')
    };

    _handleTrashIcon () {
        this._element.closest('li').remove();
        this._element = null;
    };

}

