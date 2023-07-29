import { Popup } from './Popup.js';
const popupPictureTitle = document.querySelector(".popup__picture-title");
const popupPicture = document.querySelector(".popup__picture");

export class PopupWithImage extends Popup {
  constructor(selectorPopup) { // селектор попапа
    super(selectorPopup);
  }

  open(Name, Link, Alt) {
    super.open();
    popupPictureTitle.textContent = Name; // заполняю данными из карточки
    popupPicture.src = Link;
    popupPicture.alt = Alt;
  }
}
