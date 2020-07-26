import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";
import {popupPhoto, initialCards, popupClose, openEditPopup, closeEditPopup, openAddPopup, closeAddPopup, overlayClose, popupEdit, popupAdd,
  nameInput, nameInputValue, jobInput, jobInputValue, formEditElement, formAddElement, closePhotoPopup} from "./utils.js";


const popupOpenEditButton = document.querySelector('.popup__open');
const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const popupOpenAddButton = document.querySelector('.popup__open_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const nameAddInput = popupAdd.querySelector('.popup__input_type_title');
const photoAddInput = popupAdd.querySelector('.popup__input_type_url');
const popupClosePhotoButton = popupPhoto.querySelector('.popup__close');


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

