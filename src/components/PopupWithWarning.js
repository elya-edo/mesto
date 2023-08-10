import { Popup } from './Popup.js';


export class PopupWithWarning extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._buttonYes = this._popup.querySelector(".popup__save-button");
  }

  open() {
    super.open();
    this._buttonYes.textContent = 'Да';
  }

  setEventListeners(deliteCars) {
    super.setEventListeners();
    this.deliteCars = deliteCars;
    this._buttonYes.addEventListener("click", () => {
      this._buttonYes.textContent = 'Идёт удаление...';
      this.deliteCars();
    });
  }

}
