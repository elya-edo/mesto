const template = document.querySelector("#element-item-template"); // заготовка карточки
const element = template.content.querySelector(".elements__element"); // карточка, тег article
const cardsContainer = document.querySelector(".elements"); // контейнер для карточек в html

const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector(".profile__add-button"); // кнопка добавления карточек

const popupEdit = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const popupAdd = document.querySelector(".popup_type_add"); // попап добавления карточек
const popupImage = document.querySelector(".popup_type_image"); // попап попап просмотра картинки

const buttonСlosePopups = Array.from(document.querySelectorAll(".popup__close-button")); // кнопки закрытия попапа

const formEdit = document.querySelector("#edit-form"); // форма редактирования
const formAdd = document.querySelector("#add-form"); // форма добавления

const inputNameProfile = document.querySelector("#input-nameProfile"); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector("#input-descriptionProfile"); //поле ввода описания профиля

const nameProfile = document.querySelector(".profile__name"); // имя профиля описание профиля
const descriptionProfile = document.querySelector(".profile__description"); // описание профиля

const titlePicturePopup = document.querySelector(".popup__picture-title"); // название карточки в попапе
const picturePopup = document.querySelector(".popup__picture"); // картинка карточки в попапе

const inputNameImage = document.querySelector("#input-nameImage"); // поле ввода названия картинки
const inputLinkImage = document.querySelector("#input-linkImage"); // поле ввода ссылки на картинку

const arrayInputformEdits = [inputNameProfile, inputDescriptionProfile]; // массив полей формы редактирования профиля
const arrayInputformAdds = [inputNameImage, inputLinkImage]; // массив полей формы добавления карточек

const popups = Array.from(document.querySelectorAll(".popup"));

const buttonSubmitAddCard = document.querySelector('#submit-add-button'); // кнопка отправки формы добавления карточек

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/* Объявления функций */

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.body.addEventListener("keydown", closePopupEsc);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.body.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpen = document.querySelector(".popup_opened");
    closePopup(popupOpen);
  }
}
function closePopupOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function createCard(name, link) {
  //клонирую карточку (element)
  const cloneElement = element.cloneNode(true);
  const viewImage = cloneElement.querySelector(".elements__image"); // нажать на картинку для просмотра
  const buttonLikeElement = cloneElement.querySelector(".elements__like-button"); // кнопка лайка
  const buttonDeleteElement = cloneElement.querySelector(".elements__delite-button"); // кнопка удаления

  // добавлю клону нужные свойства. В данном случае беру ссылку на картинку из ключа link и назв-е из name.
  cloneElement.querySelector(".elements__title").textContent = name;
  viewImage.src = link;
  viewImage.alt = `${name}`;

  // поставить/снять лайк
  buttonLikeElement.addEventListener("click", function () {
    buttonLikeElement.classList.toggle("elements__like-button_active");
  });

  // удаление карточки
  buttonDeleteElement.addEventListener("click", function () {
    const cardItem = buttonDeleteElement.closest(".elements__element"); // метод closest возвращает ближайший родительский элемент с переданным селектором
    cardItem.remove();
  });

  //открытие попапа картинки
  viewImage.addEventListener("click", function () {
    openPopup(popupImage);
    titlePicturePopup.textContent = name; // заполняю данными из карточки
    picturePopup.src = link; // заполняю данными из карточки
    picturePopup.alt = `${name}`;
  });

  return cloneElement;
}

//функция добавления карточек в DOM
function renderCard(Card) {
  cardsContainer.prepend(Card);
}

/* Основной код */

enableValidation(classNames); // Вызовем функцию кот запустит валидацию

// наполняю страницу элементами из начального массива
initialCards.forEach(function (item) {
  const initialCard = createCard(item.name, item.link); // кладу в переменную результат функции
  renderCard(initialCard); // отображаю на странице cозданные карточки
});

//универсальное закрытие всех попапов - обработчики крестиков
buttonСlosePopups.forEach((button) => {
  const popupBy = button.closest(".popup"); // находим 1 раз ближайший к крестику попап
  button.addEventListener("click", () => closePopup(popupBy)); // уст обработчик закрытия на крестик
});

// закрытие попапов кликом по оверлею
popups.forEach((popup) => {
  popup.addEventListener("click", closePopupOverlay);
});

//для попапа редактирования профиля
buttonEditProfile.addEventListener("click", function () {
  hideInputErrorAll(formEdit, arrayInputformEdits, classNames);
  openPopup(popupEdit);
  inputNameProfile.value = nameProfile.textContent; // заполняю форму при открытии данными из профиля
  inputDescriptionProfile.value = descriptionProfile.textContent; //заполняю форму при открытии данными из профиля
});
formEdit.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNameProfile.value;
  descriptionProfile.textContent = inputDescriptionProfile.value;
  closePopup(popupEdit);
});

//для попапа добавления карточек
buttonAddProfile.addEventListener("click", function () {
  openPopup(popupAdd);
  hideInputErrorAll(formAdd, arrayInputformAdds, classNames);
  formAdd.reset();
});
formAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = createCard(inputNameImage.value, inputLinkImage.value); // кладу в переменную результат функции
  renderCard(newCard); // отображаю на странице cозданные карточки
  closePopup(popupAdd);
  evt.target.reset(); // очищаю форму
  toggleButtonState(arrayInputformAdds, buttonSubmitAddCard, classNames);
});
