export default class Card {
    constructor({data,user, handleCardClick, handleTrashIcon, handleLikeClick, handleDislikeClick}, cardSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this.handleTrashIcon = handleTrashIcon;
        this.handleLikeClick = handleLikeClick;
        this.handleDislikeClick = handleDislikeClick;
        this._likes = data.likes;
        this._userId = data._id;
        this._ownerId = data.owner._id;
        this._currentId = user
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
        elementPhoto.alt = this._name;
        this.changeLikes();
        if(this._currentId === this._ownerId ) {
            this._element.querySelector('.element__trash').classList.add('element__trash_render')
        };
        return this._element;
    }

    _setEventListeners() {
        const elementLike = this._element.querySelector('.element__like')
        elementLike.addEventListener('click', () =>  {
            if(elementLike.classList.contains('element__like_active')) {
                this.handleDislikeClick(this._userId)
            } else {
                this.handleLikeClick(this._userId)
            }
        });
        const elementTrash = this._element.querySelector('.element__trash')
        elementTrash.addEventListener('click', () =>  {
            this.handleTrashIcon(elementTrash, this._userId);
        });
        const elementPhoto = this._element.querySelector('.element__photo');

        elementPhoto.addEventListener('click', () =>  {
           this._handleCardClick(elementPhoto);
        });
    }

    currentLikes (likes) {

        this._likes = likes
        this.changeLikes()
    }

    changeLikes () {
        this._element.querySelector('.element__number').textContent = this._likes.length
        if(this.isLiked()) {

            this._element.querySelector('.element__number').previousElementSibling.classList.add('element__like_active')
        } else {
            this._element.querySelector('.element__number').previousElementSibling.classList.remove('element__like_active')
        }
    }
        isLiked () {
            return !!this._likes.find(like => like._id === this._currentId);
        }

}

