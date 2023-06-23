const classNames = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__errorMessage_active',
  errorId: '-error'
}


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, classNames) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${classNames.errorId}`); // элемент ошибки
  inputElement.classList.add(classNames.inputErrorClass); // доб стиль невалидного поля
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classNames.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, classNames) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}${classNames.errorId}`); // элемент ошибки
  inputElement.classList.remove(classNames.inputErrorClass); // убираю стиль невалидного поля
  errorElement.classList.remove(classNames.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, classNames) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement,inputElement, inputElement.validationMessage, classNames);
  } else {
    // Если проходит, скроем
    hideInputError(formElement,inputElement, classNames);
  }
};

// Функция кот возвращает true, если хотя бы одно поле в форме не валидно, и false, если все валидны.
const hasInvalidInput = (inputList, classNames) => {    // принимает массив полей
  return inputList.some((inputElement) => {  // проходим по этому массиву методом some
    // Если поле не валидно, колбэк вернёт true -Обход массива прекратится и вся функция вернёт true
    return !inputElement.validity.valid;
  })
};

// Функция кот отключает и включает кнопку сохранить
const toggleButtonState = (inputList, buttonElement, classNames) => { // принимает массив полей  и кнопку, кот менять
  if (hasInvalidInput(inputList, classNames)) { // Если есть хотя бы один невалидный инпут
    buttonElement.classList.add(classNames.inactiveButtonClass);  // сделай кнопку неактивной
  } else {
    buttonElement.classList.remove(classNames.inactiveButtonClass);  // иначе сделай кнопку активной
  }
};


// функция кот доб слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElement, classNames) => {
  // Находим все поля внутри формы, сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(classNames.inputSelector));
  const buttonElement = formElement.querySelector(classNames.submitButtonSelector); //Найд в тек форме кнопку отправ

  toggleButtonState(inputList, buttonElement, classNames); // вызовем ф-ю перекл кнопки, чтобы не ждать ввода данных

  inputList.forEach((inputElement) => {  // Обойдём все элементы полученной коллекции
    inputElement.addEventListener('input', () => {  // каждому полю добавим обработчик события input
      isValid(formElement, inputElement, classNames)  // вызовем isValid, передав ей форму и проверяемый элемент
      toggleButtonState(inputList, buttonElement, classNames); // вызовем ф-ю переключения кнопки
    });
  });
};

// функция, которая найдёт все формы на странице:
const enableValidation = (classNames) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(classNames.formSelector));

  formList.forEach((formElement) => { // Переберём полученную коллекцию
    setEventListeners(formElement, classNames); // Для кажд вызовем функц, передав ей элемент формы
  });
};



