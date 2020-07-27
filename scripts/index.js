import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {popupPhoto, initialCards, popupClose, overlayClose, closePhotoPopup} from "./utils.js";
import {config, popupOpen} from "./utils.js";

const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEditButton = document.querySelector('.profile__open');
const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const popupOpenAddButton = document.querySelector('.profile__open_add');
const popupAdd = document.querySelector('.popup_type_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const popupClosePhotoButton = popupPhoto.querySelector('.popup__close');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const formEditElement = popupEdit.querySelector('.popup__form');
const nameInputValue = document.querySelector('.profile__title');
const formAddElement = popupAdd.querySelector('.popup__form');
const jobInputValue = document.querySelector('.profile__text');
const nameAddInput = popupAdd.querySelector('.popup__input_type_title');
const photoAddInput = popupAdd.querySelector('.popup__input_type_url');
const formEditValidator = new FormValidator(config, formEditElement);
const formAddValidator = new FormValidator(config, formAddElement);



initialCards.forEach((item) => {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__container').append(cardElement);
});


//ФУНКЦИЯ КНОПКИ СОХРАНИТЬ РЕДАКТИРОВАНИЕ ИМЕНИ ПРОФИЛЯ
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  popupClose(popupEdit);
}

//ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ 
function formSubmitAdd (evt) {
  evt.preventDefault();
  const nameAdd = nameAddInput.value;
  const photoAdd = photoAddInput.value;
  const addCardNew= {
    name: nameAdd,
    link: photoAdd,
  };
  const card = new Card(addCardNew, '#element-template');
  const cardElement = card.generateCard();
  document.querySelector('.elements__container').append(cardElement);
  popupClose(popupAdd);
}


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






popupOpenEditButton.addEventListener ('click', openEditPopup);
popupCloseEditButton.addEventListener ('click', closeEditPopup);
formEditElement.addEventListener('submit', formSubmitHandler);

popupOpenAddButton.addEventListener('click', openAddPopup);
popupCloseAddButton.addEventListener('click',closeAddPopup);
formAddElement.addEventListener('submit', formSubmitAdd);

popupAdd.addEventListener('mousedown', overlayClose);
popupEdit.addEventListener('mousedown', overlayClose);

popupClosePhotoButton.addEventListener('click',closePhotoPopup);
popupPhoto.addEventListener('mousedown', overlayClose);

