export class Popup {
  constructor(selectorPopup) { // селектор попапа
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonСlosePopup = this._popup.querySelector(".popup__close-button");
    this._buttonSubmit = this._popup.querySelector(".popup__save-button");
  }

  // открытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.body.addEventListener("keydown", this._handleEscClose);
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.body.removeEventListener("keydown", this._handleEscClose);
  }

  // метод содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // метод добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы
  setEventListeners() {
    // закрытие кликом на крестик
    this._buttonСlosePopup.addEventListener("click", this.close.bind(this));

    // закрытие кликом на оверлей
    this._popup.addEventListener("click", (evt) =>  {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
  }
}
