const buttonСlosePopups = Array.from(document.querySelectorAll(".popup__close-button")); // кнопки закрытия попапа

export class Popup {
  constructor(selectorPopup) { // селектор попапа
    this._popup = document.querySelector(selectorPopup);
  }

  // открытие попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.body.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  // закрытие попапа
  close() {
    this._popup.classList.remove("popup_opened");
    document.body.removeEventListener("keydown", this._handleEscClose.bind(this));
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
    buttonСlosePopups.forEach((button) => {
      button.addEventListener("click", this.close.bind(this));
    });
    // закрытие кликом на оверлей
    this._popup.addEventListener("click", (evt) =>  {
      if (evt.target === evt.currentTarget) {
        this.close();
      };
    });
  }
}
