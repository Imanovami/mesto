let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.popup__open');
let popupCloseButton = popup.querySelector('.popup__close');
let nameInput = popup.querySelector('.popup__name-input');
let jobInput = popup.querySelector('.popup__job-input');
let formElement = popup.querySelector('.popup__form');
let nameInputValue = document.querySelector('.profile__title');
let jobInputValue = document.querySelector('.profile__text');

let openPopup = function () {
  popupToggle();
  nameInput.value = nameInputValue.textContent; 
  jobInput.value = jobInputValue.textContent;
}

let closePopup = function () {
  popupToggle();
}

let popupToggle = function () {
  popup.classList.toggle('popup_opened')
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  popupToggle();
}

popupOpenButton.addEventListener ('click', openPopup);
popupCloseButton.addEventListener ('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);





