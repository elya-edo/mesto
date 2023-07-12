import { openPopup } from './methodsPopup.js';

export class Card {
  constructor(initialCards, templateSelector) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector; // записали селектор в приватное поле
  }

  // метод возвращает разметку новой карточки, перед размещением на страницу.
  _getTemplate() {
    const cloneElement = document        // в примере cardElement
    .querySelector(this._templateSelector) // вместо .querySelector("#element-item-template")
    .content
    .querySelector(".elements__element")
    .cloneNode(true);

    return cloneElement;     // в примере cardElement
  }


  // метод generateCard подготовит карточку к публикации. Он добавит данные в разметку, а в следующих уроках научится управлять поведением карточек. Метод публичный, чтобы возвращать готовые карточки внешним функциям:
  generateCard() {
  // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners(); // добавим обработчики

    // Добавим данные. В данном случае беру ссылку на картинку из ключа link и назв-е из name.
    this._element.querySelector(".elements__title").textContent = this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = `${this._name}`;  // наверное так ???

    // Вернём элемент наружу
    return this._element;
  }

  // добавляю слушатели событий
  _setEventListeners() {
    this._element.querySelector('.elements__like-button').addEventListener('click', () => {
      this._likeElement();
    });

    this._element.querySelector('.elements__delite-button').addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openPopupImage();
    });
  }


  // поставить/снять лайк
  _likeElement() {
    this._element.querySelector('.elements__like-button').classList.toggle("elements__like-button_active");
  }

  // удаление карточки
  _deleteElement() {
    this._element.querySelector('.elements__delite-button').closest(".elements__element").remove(); // метод closest возвращает ближайший родительский элемент с переданным селектором
    // remove удаляет
  }

  //открытие попапа картинки
  _openPopupImage() {
      openPopup(document.querySelector(".popup_type_image"));
      document.querySelector(".popup__picture-title").textContent = this._name; // заполняю данными из карточки
      document.querySelector(".popup__picture").src = this._link; // заполняю данными из карточки
      document.querySelector(".popup__picture").alt = `${this._name}`;
  }
}
