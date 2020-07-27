const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__description');
const popupBigPhoto = popupPhoto.querySelector('.popup__image-big');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


const popupOpen = (popup) => {
    popup.classList.add('popup_opened');
    window.addEventListener('keydown', closeClick);
};


const popupClose = (popup) => {
    popup.classList.remove('popup_opened');
    window.removeEventListener('keydown', closeClick);
};


//ЗАКРЫТИЕ КЛИКОМ ПО ОВЕРЛЭЙ
const overlayClose = (event) => {
    const popup = document.querySelector('.popup_opened')
    if (event.target !== event.currentTarget) {return}
    popupClose(popup);
};
//ЗАКРЫТИЕ КЛИКОМ ПО Escape
const closeClick = (evt) => {
    const popup = document.querySelector('.popup_opened')
    if (evt.key === 'Escape') {
        popupClose(popup)
    }
};

function closePhotoPopup() {
    popupClose(popupPhoto);
}

export {popupOpen,popupPhotoTitle, popupBigPhoto, popupPhoto, initialCards, popupClose, overlayClose,
    closeClick, config, closePhotoPopup}