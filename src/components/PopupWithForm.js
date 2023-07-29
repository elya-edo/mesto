import { Popup } from './Popup.js';
const listInputs = Array.from(document.querySelectorAll(".popup__input")); // все формы

export class PopupWithForm extends Popup {
  constructor({ selectorPopup, SubmitFunc }) { // (селектор попапа, колбэк сабмита формы)
    super(selectorPopup);
    this._SubmitFunc = SubmitFunc;
    this._form = this._popup.querySelector('.popup__form');
  }

  // метод собирает данные всех полей формы.
  _getInputValues() {
    this._formInputs = [];
    listInputs.forEach((input) => {
      this._formInputs[input.name] = input.value;
    });
    return this._formInputs;
  }

  // Метод также добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._SubmitFunc(this._getInputValues());
      this.close();
    });
  }

  // Перезаписывает родительский метод, так как при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._form.reset(); // очищаю форму
  }
}
