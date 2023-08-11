import { Popup } from './Popup.js';


export class PopupWithWarning extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._buttonYes = this._popup.querySelector(".popup__save-button");
  }

  open(deliteCars) {
    super.open();
    this.deliteCars = deliteCars;
    this._setEventListeners();
  }

  _setEventListeners() {
    super.setEventListeners();
    this._buttonYes.addEventListener("click", () => {
      this._buttonYes.textContent = 'Идёт удаление...';
      this.deliteCars();
    });
  }

  initialTextButton() { // начальный текст кнопки
    this._buttonYes.textContent = 'Да';
  }
}
