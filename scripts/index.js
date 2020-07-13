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

//ПЕРЕБОР МАССИВА
function initialArr(items) {
  items.forEach (item => {
    const card = createElement(item);
    renderCards(card);
  });
}

initialArr(initialCards); 

//вЫВОД КАРТОЧКИ НА ЭКРАН
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

 //КЛИК ПО ЛАЙКУ 
  const likeButton = elementBlock.querySelector('.element__like');

  function likeBut(item) {
    item.target.classList.toggle('element__like_active')  
  }

  likeButton.addEventListener('click', (evt) => likeBut(evt));

//КЛИК ПО УДАЛЕНИЮ ЭЛЕМЕНТА
  const delButton = elementBlock.querySelector('.element__trash');

  function delBut(item) {
    item.target.closest('li').remove()
  }

  delButton.addEventListener('click', (evt) => delBut(evt));

//КЛИК ПО ФОТО - УВЕЛИЧЕНИЕ
  elementPhoto.addEventListener('click',  (evt) => bigPhoto(evt.target));
  return elementBlock;
};

//РЕДАКТИРОВАНИЕ ИМЕНИ ПРОФИЛЯ
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEditButton = document.querySelector('.popup__open');
const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
const formElement = popupEdit.querySelector('.popup__form');
const nameInputValue = document.querySelector('.profile__title');
const jobInputValue = document.querySelector('.profile__text');

//ОТКРЫВАЕТ РЕДАКТИРОВАНИЕ ИМЕНИ 
const openEditPopup = () => {
  popupToggle(popupEdit);
  nameInput.value = nameInputValue.textContent; 
  jobInput.value = jobInputValue.textContent;
  addEscape();
};

//ЗАКРЫВАЕТ РЕДАКТИРОВАНИЕ ИМЕНИ
const closeEditPopup = () => {
  popupToggle(popupEdit);
  removeEscape()
  hideInputError(popupEdit,nameInput);
  hideInputError(popupEdit,jobInput);
};

const popupToggle = (popup) => {
  popup.classList.toggle('popup_opened');
};

//ФУНКЦИЯ КНОПКИ СОХРАНИТЬ РЕДАКТИРОВАНИЕ ИМЕНИ ПРОФИЛЯ
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  popupToggle(popupEdit);
};

popupOpenEditButton.addEventListener ('click', openEditPopup);
popupCloseEditButton.addEventListener ('click', closeEditPopup);
formElement.addEventListener('submit', formSubmitHandler);

const popupAdd = document.querySelector('.popup_type_add');
const popupOpenAddButton = document.querySelector('.popup__open_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const nameAddInput = popupAdd.querySelector('.popup__input_type_title');
const photoAddInput = popupAdd.querySelector('.popup__input_type_url');
const formAddElement = popupAdd.querySelector('.popup__form');

//ОТКРЫТИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const openAddPopup = () => {
  popupToggle(popupAdd);
  addEscape();
};

//ЗАКРТЫИЕ ДОБАВЛЕНИЯ КАРТОЧКИ
const closeAddPopup = () => {
  popupToggle(popupAdd)
  removeEscape()
  hideInputError(popupAdd,nameAddInput);
  hideInputError(popupAdd,photoAddInput);
  nameAddInput.value = '';
  photoAddInput.value = '';
};

popupOpenAddButton.addEventListener('click', openAddPopup);
popupCloseAddButton.addEventListener('click',closeAddPopup);
formAddElement.addEventListener('submit', formSubmitAdd);



//ЗАКРЫТИЕ КЛИКОМ ПО ОВЕРЛЭЙ
const overlayClose = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (event.target !== event.currentTarget) {return}
  popupToggle(popup);
  removeEscape()
};

const closeClick = (evt) => {
  const popup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    popupToggle(popup)
    removeEscape()
  }
};



popupAdd.addEventListener('mousedown', overlayClose);
popupEdit.addEventListener('mousedown', overlayClose);


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
  nameAddInput.value = '';
  photoAddInput.value = '';
  popupToggle(popupAdd);
};

function closepPhotoPopup() {
  popupToggle(popupPhoto);
  removeEscape()
};

const popupPhoto = document.querySelector('.popup_type_photo');
const popupPhotoTitle = popupPhoto.querySelector('.popup__description');
const popupClosePhotoButton = popupPhoto.querySelector('.popup__close');
const popupBigPhoto = popupPhoto.querySelector('.popup__image-big');
popupClosePhotoButton.addEventListener('click',closepPhotoPopup);
popupPhoto.addEventListener('mousedown', overlayClose);

//УВЕЛИЧЕНИЕ ФОТО
function bigPhoto (photo) {
  popupToggle(popupPhoto);
  popupBigPhoto.src = photo.src;
  popupPhotoTitle.textContent = photo.closest('li').textContent;
  popupBigPhoto.alt = photo.closest('li').textContent
  addEscape();
};

function addEscape() {
  window.addEventListener('keydown', closeClick);
};

function removeEscape() {
  window.removeEventListener('keydown', closeClick);
};

enableValidation();