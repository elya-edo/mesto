import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selectorPopup) { // селектор попапа
    super(selectorPopup);
    this._popupPictureTitle = this._popup.querySelector(".popup__picture-title");
    this._popupPicture = this._popup.querySelector(".popup__picture");
  }

  open(name, link) {
    super.open();
    this._popupPictureTitle.textContent = name; // заполняю данными из карточки
    this._popupPicture.src = link;
  }
}
