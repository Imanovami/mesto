import {FormValidator} from "./FormValidator.js";
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
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const nameInputValue = document.querySelector('.profile__title');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const formEditElement = popupEdit.querySelector('.popup__form');
const formAddElement = popupAdd.querySelector('.popup__form');
const jobInputValue = document.querySelector('.profile__text');
const formEditValidator = new FormValidator(config, formEditElement);
const formAddValidator = new FormValidator(config, formAddElement);



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

//ОТКРЫВАЕТ РЕДАКТИРОВАНИЕ ИМЕНИ

const openEditPopup = () => {
    popupOpen(popupEdit);
    nameInput.value = nameInputValue.textContent;
    jobInput.value = jobInputValue.textContent;
    formEditValidator.enableValidation();
};

//ЗАКРЫВАЕТ РЕДАКТИРОВАНИЕ ИМЕНИ
const closeEditPopup = () => {
    popupClose(popupEdit);
    formEditValidator.hideInputError(popupEdit,nameInput);
    formEditValidator.hideInputError(popupEdit,jobInput);
};


//ОТКРЫТИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const openAddPopup = () => {
    popupOpen(popupAdd);
    formAddElement.reset();
    formAddValidator.enableValidation();
};

//ЗАКРТЫИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const closeAddPopup = () => {
    popupClose(popupAdd)
    formAddValidator.hideInputError(popupAdd,nameAddInput);
    formAddValidator.hideInputError(popupAdd,photoAddInput);
};

//ЗАКРЫТИЕ КЛИКОМ ПО ОВЕРЛЭЙ
const overlayClose = (evt) => {
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

export {popupOpen,popupPhotoTitle, popupBigPhoto, popupPhoto, initialCards, popupClose, openEditPopup, closeEditPopup, openAddPopup, closeAddPopup, overlayClose,
    closeClick, popupEdit,popupAdd, nameInput,nameInputValue, jobInput, jobInputValue, config, formEditElement, formAddElement, closePhotoPopup}