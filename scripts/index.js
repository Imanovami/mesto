const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const elementTemplate = document.querySelector('#element-template');
const elementContainer = document.querySelector('.elements__container');
const elementContent = elementTemplate.content 

const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEditButton = document.querySelector('.popup__open');
const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const formElement = popupEdit.querySelector('.popup__form');
const nameInputValue = document.querySelector('.profile__title');
const jobInputValue = document.querySelector('.profile__text');

const popupAdd = document.querySelector('.popup_type_add');
const popupOpenAddButton = document.querySelector('.popup__open_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const nameAddInput = popupAdd.querySelector('.popup__input_type_title');
const photoAddInput = popupAdd.querySelector('.popup__input_type_url');
const formAddElement = popupAdd.querySelector('.popup__form');

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__description');
const popupClosePhotoButton = popupPhoto.querySelector('.popup__close');
const popupBigPhoto = popupPhoto.querySelector('.popup__image-big');


// ВЫВОД КАРТОЧКИ НА ЭКРАН
function renderCards(item) {
  elementContainer.prepend(item);
}

//СОЗДАНИЕ КАРТОЧКИ И КЛИКИ 
function createElement(item) {
  const elementBlock = elementContent.cloneNode(true);
  elementBlock.querySelector('.element__title').textContent = item.name;
  const elementPhoto = elementBlock.querySelector('.element__photo');
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

  const likeButton = elementBlock.querySelector('.element__like');
  likeButton.addEventListener('click', (evt) => handleLikeIcon(evt));

  const delButton = elementBlock.querySelector('.element__trash');
  delButton.addEventListener('click', (evt) => handleTrashIcon(evt));

  elementPhoto.addEventListener('click',  (evt) => openBigPhoto(evt.target));
  return elementBlock;
};

function handleLikeIcon (item) {
  item.target.classList.toggle('element__like_active')
};

function handleTrashIcon (item) {
  item.target.closest('li').remove()
};

//ПЕРЕБОР МАССИВА
initialCards.forEach (item => {
  const card = createElement(item);
  renderCards(card);
});

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
};

//ЗАКРЫВАЕТ РЕДАКТИРОВАНИЕ ИМЕНИ
const closeEditPopup = () => {
  popupClose(popupEdit);
  hideInputError(popupEdit,nameInput);
  hideInputError(popupEdit,jobInput);
};

//ФУНКЦИЯ КНОПКИ СОХРАНИТЬ РЕДАКТИРОВАНИЕ ИМЕНИ ПРОФИЛЯ
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  popupClose(popupEdit);
};

//ОТКРЫТИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const openAddPopup = () => {
  popupOpen(popupAdd);
  formAddElement.reset();
  setEventListeners(formAddElement);
};

//ЗАКРТЫИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const closeAddPopup = () => {
  popupClose(popupAdd)
  hideInputError(popupAdd,nameAddInput);
  hideInputError(popupAdd,photoAddInput);
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

//ФУНКЦИЯ СОХРАНЕНИЯ НОВОЙ КАРТОЧКИ 
function formSubmitAdd (evt) {
  evt.preventDefault();
  const nameAdd = nameAddInput.value;
  const photoAdd = photoAddInput.value;
  const addCardNew= {
    name: nameAdd,
    link: photoAdd,
  };

  const cardInput = createElement(addCardNew);
  renderCards(cardInput);
  popupClose(popupAdd);
};

function closepPhotoPopup() {
  popupClose(popupPhoto);
};


//УВЕЛИЧЕНИЕ ФОТО
function openBigPhoto (photo) {
  popupOpen(popupPhoto);
  popupBigPhoto.src = photo.src;
  popupPhotoTitle.textContent = photo.closest('li').textContent;
  popupBigPhoto.alt = photo.closest('li').textContent
};

popupOpenEditButton.addEventListener ('click', openEditPopup);
popupCloseEditButton.addEventListener ('click', closeEditPopup);
formElement.addEventListener('submit', formSubmitHandler);

popupOpenAddButton.addEventListener('click', openAddPopup);
popupCloseAddButton.addEventListener('click',closeAddPopup);
formAddElement.addEventListener('submit', formSubmitAdd);

popupAdd.addEventListener('mousedown', overlayClose);
popupEdit.addEventListener('mousedown', overlayClose);

popupClosePhotoButton.addEventListener('click',closepPhotoPopup);
popupPhoto.addEventListener('mousedown', overlayClose);

enableValidation(config);