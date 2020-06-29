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

const elementTemplate = document.querySelector('#element-template');
const elementContainer = document.querySelector('.elements__container');
const popup = document.querySelector('.popup');
const elementContent = elementTemplate.content 
///Добавление элементов
function addElm(item) {
  const elementBlock = elementContent.cloneNode(true);
  elementBlock.querySelector('.element__title').textContent = item.name;
  const elementPhoto = elementBlock.querySelector('.element__photo');
  elementPhoto.src = item.link;
  elementPhoto.textContent = item.alt
  elementContainer.prepend(elementBlock);
 ///Клик по лайку 
  const likeButton = document.querySelector('.element__like');
  likeButton.addEventListener('click', (evt) => evt.target.classList.toggle('element__like_active'));
///Клип по удалению элемента
  const delButton = document.querySelector('.element__trash');
  delButton.addEventListener('click', (evt) => evt.target.parentNode.remove());
///Клик по фото- увеличение
  elementPhoto.addEventListener('click',  (evt) => bigPhoto(evt.target));
  
};
///Перебор элементов
initialCards.forEach (item => addElm(item));


///Изменить имя профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEditButton = document.querySelector('.popup__open');
const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const nameInput = popupEdit.querySelector('.popup__name-input');
const jobInput = popupEdit.querySelector('.popup__job-input');
const formElement = popupEdit.querySelector('.popup__form');
const nameInputValue = document.querySelector('.profile__title');
const jobInputValue = document.querySelector('.profile__text');
const popupOpened = document.querySelector('.popup_opened');

let openEditPopup = function () {
  popupToggle(popupEdit);
  nameInput.value = nameInputValue.textContent; 
  jobInput.value = jobInputValue.textContent;
}

let closeEditPopup = function () {
  popupToggle(popupEdit);
}

let popupToggle = function (popup) {
  popup.classList.toggle('popup_opened');
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  popupToggle(popupEdit);
}



popupOpenEditButton.addEventListener ('click', openEditPopup);
popupCloseEditButton.addEventListener ('click', closeEditPopup);
formElement.addEventListener('submit', formSubmitHandler);

/// Добавить карточку
const popupAdd = document.querySelector('.popup_type_add');
const popupOpenAddButton = document.querySelector('.popup__open_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const nameAddInput = popupAdd.querySelector('.popup__name-input');
const photoAddInput = popupAdd.querySelector('.popup__job-input');
const formAddElement = popupAdd.querySelector('.popup__form');


popupOpenAddButton.addEventListener('click', () => popupToggle(popupAdd));
popupCloseAddButton.addEventListener('click',() => popupToggle(popupAdd));
formAddElement.addEventListener('submit', formSubmitAdd);

function formSubmitAdd (evt) {
  evt.preventDefault();
  let nameAdd = nameAddInput.value;
  let photoAdd = photoAddInput.value;
  let item= {};
  item.name = nameAdd;
  item.link = photoAdd;
  addElm(item);
  nameAddInput.value = '';
  photoAddInput.value = '';
  popupToggle(popupAdd);
};

  const popupPhoto = document.querySelector('.popup_type_photo');
  const popupPhotoTitle = popupPhoto.querySelector('.popup__description');
  const popupClosePhotoButton = popupPhoto.querySelector('.popup__close');
  const popupBigPhoto = popupPhoto.querySelector('.popup__image-big');
  popupClosePhotoButton.addEventListener('click',() => popupToggle(popupPhoto));
  
  function bigPhoto (photo) {
  popupToggle(popupPhoto);
  popupBigPhoto.src = photo.src;
  console.log(photo.parentNode.textContent);
  popupPhotoTitle.textContent = photo.parentNode.textContent;
  popupPhotoTitle.alt = photo.parentNode.textContent
}
