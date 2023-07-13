
export class FormValidator {
  constructor(classNames, formElement) {
    this._formElement = formElement;
    this._classNames = classNames;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._classNames.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._classNames.submitButtonSelector);
  }

  // метод запустит валидацию:
  enableValidation() {
    this._toggleButtonState(); // вызовем ф-ю перекл кнопки, чтобы не ждать ввода данных
    this._setEventListeners();
  };

  // метод добавит слушатель событий всем полям ввода внутри формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {  // каждому полю добавим обработчик события input
        this._isValid(inputElement);  // вызовем isValid
        this._toggleButtonState(); // вызовем ф-ю переключения кнопки
      });
    });
  };

  // метод добавляет ошибки и стили невалидных полей
  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._classNames.inputErrorClass); // доб стиль невалидного поля
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._classNames.errorClass);
  };

  // метод очищает поле от ошибкок
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._classNames.inputErrorClass); // убираю стиль невалидного поля
    this._errorElement.classList.remove(this._classNames.errorClass);
    this._errorElement.textContent = '';
  };

  // метод проверяет валидность поля
  _isValid(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}${this._classNames.errorId}`); // элемент ошибки
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };

  // метод возвращает true, если хотя бы одно поле в форме не валидно, и false, если все валидны.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {  // проходим по этому массиву методом some
      // Если поле не валидно, колбэк вернёт true -Обход массива прекратится и вся функция вернёт true
      return !inputElement.validity.valid;
    })
  };

  // метод отключает и включает кнопку сохранить
  _toggleButtonState() {
    if (this._hasInvalidInput()) { // Если есть хотя бы один невалидный инпут
      this._buttonElement.classList.add(this._classNames.inactiveButtonClass);  // сделай кнопку неактивной
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._classNames.inactiveButtonClass); // иначе сд кнопку активн
      this._buttonElement.removeAttribute('disabled');
    }
  }
}
