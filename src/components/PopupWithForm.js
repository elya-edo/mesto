import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ selectorPopup, submitFunc }) { // (селектор попапа, колбэк сабмита формы)
    super(selectorPopup);
    this._submitFunc = submitFunc;
    this._form = this._popup.querySelector('.popup__form');
    this._listInputs = this._form.querySelectorAll(".popup__input"); // все поля
    this._buttonSubmit = this._popup.querySelector(".popup__save-button");
    this._initialTextButton = this._buttonSubmit.textContent;
    this._errorInputs = this._form.querySelectorAll(".popup__errorMessage"); // элемент сообщения ошибки неалидного поля
  }

  // метод собирает данные всех полей формы.
  _getInputValues() {
    this._formInputs = [];
    this._listInputs.forEach((input) => {
      this._formInputs[input.name] = input.value;
    });
    return this._formInputs;
  }

  // Метод также добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._buttonSubmit.textContent = 'Сохранение...';
      this._submitFunc(this._getInputValues());
    });
  }

  // Перезаписывает родительский метод, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset(); // очищаю форму
    // убираю стили невалидных полей, если они есть, чтобы при последующем открытии пустой формы их не было
    this._listInputs.forEach((input) => {
      if (input.classList.contains('popup__input_invalid')) {
        input.classList.remove('popup__input_invalid');
      }
    });
    // убираю сообщения ошибки невалидных полей, если они есть, чтобы при последующем открытии их не было
    this._errorInputs.forEach((errorMessage) => {
      if (errorMessage.classList.contains('popup__errorMessage_active')) {
      errorMessage.classList.remove('popup__errorMessage_active');
      errorMessage.textContent = '';
      }
     });
  }

  initialTextButton() { // начальный текст кнопки
    this._buttonSubmit.textContent = this._initialTextButton;
  }

}
