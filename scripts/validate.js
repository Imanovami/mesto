
//ПОКАЗЫВАЕМ ЭЛЕМЕНТ ОШИБКИ
const showInputError = (formElement, inputElement, errorMessage) => {
  //Находим элемент внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}; 

//СКРЫВАЕМ ЭЛЕМЕНТ ОШИБКИ
const hideInputError = (formElement, inputElement) => {
  //Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//ПРОВЕРЯЕМ ВАЛИДНОСТЬ ПОЛЯ
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    //Принимает проверяемое поле,само значение и ошибку
  } else {
    hideInputError(formElement, inputElement);
  }
};

//ПРИНИМАЕТ МАССИВ ПОЛЕЙ ВВОДА И ЭЛЕМЕНТ КНОПКИ, СОСТОЯНИЕ КОТОРОЙ НАДО МЕНЯТЬ
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "false");
  }
};

//ПРОХОДИМСЯ ПО input-ам, ЕСЛИ ХОТЯ БЫ ОДИН НЕ ВАЛИДЕН-true
const hasInvalidInput = (inputList) => {
  //Проходимся по массиву
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//ДОБАВЛЯЕМ СЛУШАТЕЛЬ СОБЫТИЙ ВСЕМ ПОЛЯМ ВВОДА
const setEventListeners = (formElement) => {
  //Находим все поля внутри формы и делаем из них массив 
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  //Находим в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  //Обходим все поля полученной коллекции
  inputList.forEach((inputElement) => {
    //Добавляем обработчик событий
    inputElement.addEventListener('input', function () {
      //Вызываем фунцию проверки валидности и передаем проверяемый элемент
      checkInputValidity(formElement, inputElement);
      // Вызовем функцию и передадаем ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};


//НАХОДИМ И ПЕРЕБИРАЕМ ВСЕ ФОРМЫ НА СТРАНИЦЕ
const enableValidation = (config) => {
  const {
  formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass
} = config;
//Находим все формы с указанным классом в DOM и делаем из них массив
const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    //Перебираем полученную коллекцию
    formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  //Для каждой формы вызываем фукнцию и передаем ей элемент формы
    setEventListeners(formElement);  
});
};


