export class Card {
  constructor(initialCards, templateSelector, handleCardClick, handleDeleteCard) {
    this._name = initialCards.name;
    this._link = initialCards.link;
    this._id = initialCards._id;
    this._idUser = initialCards.owner._id; // наахожу id пользователя добавившего карточку
    this._likes = initialCards.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this._isLiked = initialCards.likes.some(function(item) { // проверка наличия лайка
      return item._id === '839e9c3449529c67f8d9516a';
    });
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
  generateCard(addLikeApi, deliteLikeApi) {
  // Запишем разметку в приватное поле _element. Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__image");
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deliteButton = this._element.querySelector('.elements__delite-button');
    this._quantityLikes = this._element.querySelector(".elements__like-quantity");

    this._setEventListeners(addLikeApi, deliteLikeApi); // добавим обработчики

    // Добавим данные. В данном случае беру ссылку на картинку из ключа link и назв-е из name.
    this._element.querySelector(".elements__title").textContent = this._name;
    this._cardImage.src = this._link;
    this.changeQuantityLikes(this._likes);
    if (this._isLiked) {
      this.likeElement();
    }
    if (this._idUser !== '839e9c3449529c67f8d9516a') { // чтобы иконка удаления была только у моих карточек
      this._deliteButton.remove();
    }

    return this._element;  // Вернём элемент наружу
  }

  // добавляю слушатели событий
  _setEventListeners(addLikeApi, deliteLikeApi) {
    this._likeButton.addEventListener('click', () => {

      if (this._likeButton.classList.contains('elements__like-button_active')) {
        deliteLikeApi(this._id);
      }
      else {
        addLikeApi(this._id);
      }
      //this.likeElement();

    });

    this._deliteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link, `${this._name}`);
    });
  }

  // поставить/снять лайк
  likeElement() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  // удаление карточки
  deleteElement() {
    this._element.remove();
    //this._element = null;
  }

  // метод регулирует счетчик лайков
  changeQuantityLikes(quantityLikes) {
    this._quantityLikes.textContent = quantityLikes;
  }
}
