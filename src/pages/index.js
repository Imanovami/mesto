import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {initialCards} from "../utils/utils.js";
import {config, containerListSelector} from "../utils/utils.js";
import Section from "../components/Section.js"
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";


const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_add';
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEditButton = document.querySelector('.profile__open');
const popupOpenAddButton = document.querySelector('.profile__open_add');
const popupAdd = document.querySelector('.popup_type_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const nameInputSelector = '.popup__input_type_name';
const jobInputSelector = '.popup__input_type_job';
const nameEditInput = document.querySelector('.popup__input_type_name');
const jobEditInput = document.querySelector('.popup__input_type_job');
const formEditElement = popupEdit.querySelector('.popup__form');
const nameInputValue = '.profile__title';
const formAddElement = popupAdd.querySelector('.popup__form');
const jobInputValue ='.profile__text';
const nameAddInput = popupAdd.querySelector('.popup__input_type_title');
const photoAddInput = popupAdd.querySelector('.popup__input_type_url');
const formEditValidator = new FormValidator(config, formEditElement);
const formAddValidator = new FormValidator(config, formAddElement);
const edit = new Popup(popupEditSelector);
const add = new Popup(popupAddSelector);
const editUser = new UserInfo(nameInputValue, jobInputValue);
const nameInput = document.querySelector(nameInputSelector);
const jobInput =  document.querySelector(jobInputSelector);
const photo = new PopupWithImage('.popup_type_photo')

const openBigPhoto = (elm) => {
  photo.open(elm);
}

photo.setEventListeners()

const section = new Section ({
  item: initialCards,
  renderer: (item) => {
    const card = new Card ({data: item, handleCardClick: openBigPhoto},'#element-template' );
    const cardElement = card.generateCard();
    section.addItem(cardElement)
   }
}, containerListSelector);

section.renderItems()

const formEdit = new PopupWithForm({
  selectorPopup: popupEditSelector,
  handleFormSubmit: (data) => {
    editUser.setUserInfo(data)
    formEdit.close()
  }
});

formEdit.setEventListeners();

const formAdd = new PopupWithForm({
  selectorPopup: popupAddSelector,
  handleFormSubmit: () => {
    const nameAdd = nameAddInput.value;
    const photoAdd = photoAddInput.value;
    const addCardNew= {
      name: nameAdd,
      link: photoAdd,
    };
    const card = new Card({data: addCardNew, handleCardClick: openBigPhoto},'#element-template');
    const cardElement = card.generateCard();
    document.querySelector('.elements__container').prepend(cardElement);
    formAdd.close();
  }
})

formAdd.setEventListeners();

//ОТКРЫВАЕТ РЕДАКТИРОВАНИЕ ИМЕНИ
const openEditPopup = () => {
  edit.open()
  nameInput.value = editUser.getUserInfo().name;
  jobInput.value = editUser.getUserInfo().job;

  formEditValidator.hideInputError(popupEdit,nameEditInput);
  formEditValidator.hideInputError(popupEdit,jobEditInput);
};
formEditValidator.enableValidation();

//ОТКРЫТИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const openAddPopup = () => {
  add.open()
};
formAddValidator.enableValidation();
//ЗАКРТЫИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const closeAddPopup = () => {
  add.close()
  formAddValidator.hideInputError(popupAdd,nameAddInput);
  formAddValidator.hideInputError(popupAdd,photoAddInput);
};

edit.setEventListeners()
add.setEventListeners()

popupOpenEditButton.addEventListener ('click', openEditPopup);
popupOpenAddButton.addEventListener('click', openAddPopup);
popupCloseAddButton.addEventListener('click',closeAddPopup);




