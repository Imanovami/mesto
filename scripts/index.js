const elementTemplate = document.querySelector('#element-template');
const elementContainer = document.querySelector('.elements__container');
const elementContent = elementTemplate.content 

///Перебор массива
function initialArr(items) {
  items.forEach (item => {
    const card = addElm(item);
    renderCards(card);
  });
}

initialArr(initialCards); 

/// Вывод карточки на экран 
function renderCards(item) {
  elementContainer.prepend(item);
}

/// Создание карточки и клики 
function addElm(item) {
  const elementBlock = elementContent.cloneNode(true);
  elementBlock.querySelector('.element__title').textContent = item.name;
  const elementPhoto = elementBlock.querySelector('.element__photo');
  elementPhoto.src = item.link;
  elementPhoto.alt = item.name;

 ///Клик по лайку 
  const likeButton = elementBlock.querySelector('.element__like');

  function likeBut(item) {
    item.target.classList.toggle('element__like_active')  
  }

  likeButton.addEventListener('click', (evt) => likeBut(evt));

///Клик по удалению элемента
  const delButton = elementBlock.querySelector('.element__trash');

  function delBut(item) {
    item.target.closest('li').remove()
  }

  delButton.addEventListener('click', (evt) => delBut(evt));

///Клик по фото- увеличение
  elementPhoto.addEventListener('click',  (evt) => bigPhoto(evt.target));

  return elementBlock
 
};

///Редактирование имя профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupOpenEditButton = document.querySelector('.popup__open');
const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const nameInput = popupEdit.querySelector('.popup__name-input');
const jobInput = popupEdit.querySelector('.popup__job-input');
const formElement = popupEdit.querySelector('.popup__form');
const nameInputValue = document.querySelector('.profile__title');
const jobInputValue = document.querySelector('.profile__text');
const popupOpened = document.querySelector('.popup_opened');

const openEditPopup = function () {
  popupToggle(popupEdit);
  nameInput.value = nameInputValue.textContent; 
  jobInput.value = jobInputValue.textContent;
}

const closeEditPopup = function () {
  popupToggle(popupEdit);
}

const popupToggle = function (popup) {
  popup.classList.toggle('popup_opened');
};

///Функция кнопки сохранить редактирвоание имя профиля
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  popupToggle(popupEdit);
}

popupOpenEditButton.addEventListener ('click', openEditPopup);
popupCloseEditButton.addEventListener ('click', closeEditPopup);
formElement.addEventListener('submit', formSubmitHandler);

const popupAdd = document.querySelector('.popup_type_add');
const popupOpenAddButton = document.querySelector('.popup__open_add');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const nameAddInput = popupAdd.querySelector('.popup__name-input');
const photoAddInput = popupAdd.querySelector('.popup__job-input');
const formAddElement = popupAdd.querySelector('.popup__form');


popupOpenAddButton.addEventListener('click', () => popupToggle(popupAdd));
popupCloseAddButton.addEventListener('click',() => popupToggle(popupAdd));
formAddElement.addEventListener('submit', formSubmitAdd);

///Функция сохранения новой карточки 
function formSubmitAdd (evt) {
  evt.preventDefault();
  const nameAdd = nameAddInput.value;
  const photoAdd = photoAddInput.value;
  const addCardNew= {
    name: nameAdd,
    link: photoAdd,
  };
  const cardinput = addElm(addCardNew);
  renderCards(cardinput);
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
    popupPhotoTitle.textContent = photo.closest('li').textContent;
    popupBigPhoto.alt = photo.closest('li').textContent
}