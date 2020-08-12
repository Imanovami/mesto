export default class FormValidator {
  constructor (config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }
  _showInputError (formElement, inputElement, errorMessage) {
    //Находим элемент внутри самой функции
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  } 

  //СКРЫВАЕМ ЭЛЕМЕНТ ОШИБКИ
  hideInputError = (formElement, inputElement) => {
  //Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  errorElement.classList.remove(this._config.errorClass);
  errorElement.textContent = '';
  }

  _checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
      //Принимает проверяемое поле,само значение и ошибку
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  enableValidation = () => {
      this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    //Для каждой формы вызываем фукнцию и передаем ей элемент формы
      this._setEventListeners();  
  }

   _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass)
      buttonElement.setAttribute("disabled", "true");
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", "false");
    }
  };


  _setEventListeners = () => {
    //Находим все поля внутри формы и делаем из них массив
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));

    //Находим в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    //Обходим все поля полученной коллекции
    inputList.forEach((inputElement) => {
      //Добавляем обработчик событий
      inputElement.addEventListener('input', () => {
        //Вызываем фунцию проверки валидности и передаем проверяемый элемент
        this._checkInputValidity(this._formElement, inputElement);
        // Вызовем функцию и передадаем ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

   _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {

      return !inputElement.validity.valid;
    })
  };
}

