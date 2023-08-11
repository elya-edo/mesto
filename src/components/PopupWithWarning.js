import { Popup } from './Popup.js';


export class PopupWithWarning extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._buttonYes = this._popup.querySelector(".popup__save-button");
    this._initialTextButton = this._buttonYes.textContent;
  }

  open(deliteCars) {
    super.open();
    this.deliteCars = deliteCars;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonYes.addEventListener("click", () => {
      this._buttonYes.textContent = 'Идёт удаление...';
      this.deliteCars();
    });
  }

  initialTextButton() { // начальный текст кнопки
    this._buttonYes.textContent = this._initialTextButton;
  }
}
