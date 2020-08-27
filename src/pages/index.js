import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {config, containerListSelector,avatarPlace} from "../utils/utils.js";
import Section from "../components/Section.js"
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Api from "../components/Api";
import {loader} from "../utils/loader.js";
const popupDelSelector = '.popup_type_submit';

const popupEditSelector = '.popup_type_edit';
const popupAddSelector = '.popup_type_add';
const popupEditAvatarSelector = '.popup_type_avatar';
const popupEditAvatar = document.querySelector(popupEditAvatarSelector);
const popupEditAvatarElement = popupEditAvatar.querySelector('.popup__form')
const popupAvatarInput = popupEditAvatar.querySelector('.popup__input_type_name')
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
const formAvatarValidator = new FormValidator(config, popupEditAvatarElement);
const edit = new Popup(popupEditSelector);
const add = new Popup(popupAddSelector);
const editUser = new UserInfo(nameInputValue, jobInputValue);
const nameInput = document.querySelector(nameInputSelector);
const jobInput =  document.querySelector(jobInputSelector);
const photo = new PopupWithImage('.popup_type_photo')
const buttonCreate = popupAdd.querySelector('.popup__save')
const trash = new PopupWithSubmit(popupDelSelector)


formAddValidator.enableValidation();
formEditValidator.enableValidation();
formAvatarValidator.enableValidation();
const avatar = new PopupWithForm({
    selectorPopup: popupEditAvatarSelector,
    handleFormSubmit: () => {
        const inputAvatarUrl = popupAvatarInput.value
        loader(true, popupEditAvatar)
        api.renderAvatar(inputAvatarUrl).then(() => {
            avatarPlace.src = inputAvatarUrl
            loader(false, popupEditAvatar)
            avatar.close();
        })
    }
});

const openBigPhoto = (elm) => {
  photo.open(elm);
}
photo.setEventListeners()

//ОТКРЫТИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const openAddPopup = () => {
  add.open();
  formAddValidator.buttonDisabled(buttonCreate);
};

//ЗАКРТЫИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const closeAddPopup = () => {
  add.close()
  formAddValidator.hideInputError(popupAdd,nameAddInput);
  formAddValidator.hideInputError(popupAdd,photoAddInput);
};

const deleteCard = (elm, id) => {
    trash.open();
    trash.setEventListeners()
    trash.setSubmitHandler(() =>
            api.deleteCard(id)
            .then(() =>{
                trash.deleteCardPop(elm)
                trash.close()
            }).catch((err) => console.log(err))
            )
    };

edit.setEventListeners()
add.setEventListeners()

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '00b33d51-68c9-42fa-8517-2940f1c37877',
    'Content-Type': 'application/json'
  }
});

let currentUserId;

api.getUserData()
    .then(data => {
      editUser.setUserInfo(data);
        currentUserId = data._id;
      const formEdit = new PopupWithForm({
        selectorPopup: popupEditSelector,
        handleFormSubmit: (data) => {
          editUser.saveUser(data)
            loader(true, popupEdit)
            api.changeProfile(data['name-input'], data['name-input'])
            loader(false, popupEdit)
            formEdit.close()
        }
      })
      popupOpenEditButton.addEventListener ('click', () => {
        edit.open()
        nameInput.value = editUser.getUserInfo().name;
        jobInput.value = editUser.getUserInfo().job;
        formEditValidator.hideInputError(popupEdit,nameEditInput);
        formEditValidator.hideInputError(popupEdit,jobEditInput);
      })
      formEdit.setEventListeners();
        })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

api.getInitialCards()
    .then((data) => {
      const section = new Section ({
        item: data,
        renderer: (item) => {
          const card = new Card ({
              data: item,
              user: currentUserId,
              handleCardClick: openBigPhoto,
              handleTrashIcon: deleteCard,
              handleLikeClick: (id) => {
                  api.setLike(id).then(res => {
                      card.currentLikes(res.likes)
                  })
              },
              handleDislikeClick: (id) => {
                  api.deleteLike(id).then(res => {
                      card.currentLikes(res.likes)
                  })
              }}, '#element-template');
          const cardElement = card.generateCard();
          section.addItem(cardElement)
        }
      }, containerListSelector);

      section.renderItems();
        const formAdd = new PopupWithForm({
            selectorPopup: popupAddSelector,
            handleFormSubmit: () => {
                const nameAdd = nameAddInput.value;
                const photoAdd = photoAddInput.value;
                loader(true, popupAdd)
                api.postCard(nameAdd, photoAdd)
                    .then((result) => {
                         const card = new Card({
                            data: result,
                            user: currentUserId,
                            handleCardClick: openBigPhoto,
                            handleTrashIcon: deleteCard,
                            handleLikeClick: (id) => {
                                api.setLike(id).then(res => {
                                    card.currentLikes(res.likes)
                                })
                            },
                            handleDislikeClick: (id) => {
                                api.deleteLike(id).then(res => {
                                    card.currentLikes(res.likes)

                                })
                        }}, '#element-template');
                        const cardElement = card.generateCard();
                        section.addItem(cardElement);
                        loader(false, popupAdd)
                        formAdd.close();
                    })
            }
        })
        formAdd.setEventListeners();
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    });


popupOpenAddButton.addEventListener('click', openAddPopup);
popupCloseAddButton.addEventListener('click',closeAddPopup);
avatarPlace.addEventListener('click', ()=> {
    avatar.open()
    formAvatarValidator.hideInputError(popupEditAvatar, popupAvatarInput);
})
avatar.setEventListeners()




