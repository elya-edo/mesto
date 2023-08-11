import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ selectorPopup, submitFunc }) { // (селектор попапа, колбэк сабмита формы)
    super(selectorPopup);
    this._submitFunc = submitFunc;
    this._form = this._popup.querySelector('.popup__form');
    this._listInputs = this._form.querySelectorAll(".popup__input"); // все поля
    this._buttonSubmit = this._popup.querySelector(".popup__save-button");
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
  }

  initialTextButton() { // начальный текст кнопки
    this._buttonSubmit.textContent = 'Сохранить';
  }

}
