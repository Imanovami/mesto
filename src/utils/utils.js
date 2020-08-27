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
const containerListSelector =  '.elements__container';
const avatarPlace = document.querySelector('.profile__avatar')




export {popupPhotoTitle, popupBigPhoto, popupPhoto,
     config, containerListSelector, avatarPlace}