export class Card {
  constructor(initialCards, templateSelector, handleCardClick) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick.bind(this);
  }

  // метод возвращает разметку новой карточки, перед размещением на страницу.
  _getTemplate() {
    const cloneElement = document
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
    this._cardImage = this._element.querySelector(".elements__image");
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deliteButton = this._element.querySelector('.elements__delite-button');
    this._setEventListeners(); // добавим обработчики

    // Добавим данные. В данном случае беру ссылку на картинку из ключа link и назв-е из name.
    this._element.querySelector(".elements__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = `${this._name}`;

    return this._element;  // Вернём элемент наружу
  }

  // добавляю слушатели событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeElement();
    });

    this._deliteButton.addEventListener('click', () => {
      this._deleteElement();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, `${this._name}`);
    });
  }

  // поставить/снять лайк
  _likeElement() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  // удаление карточки
  _deleteElement() {
    this._deliteButton.closest(".elements__element").remove(); // метод closest возвращает ближайший родительский элемент с переданным селектором
  }
}
