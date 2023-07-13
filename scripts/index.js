import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, closePopupOverlay } from './methodsPopup.js';

const cardsContainer = document.querySelector(".elements"); // контейнер для карточек в html
const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector(".profile__add-button"); // кнопка добавления карточек
const popupEdit = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const popupAdd = document.querySelector(".popup_type_add"); // попап добавления карточек
const buttonСlosePopups = Array.from(document.querySelectorAll(".popup__close-button")); // кнопки закрытия попапа

//любую форму можно сразу получить из document.forms по уникальному атрибуту name, который указываются в тегах form
const formEdit = document.forms["edit-form"]; // форма редактирования
const formAdd = document.forms["add-form"]; // форма добавления
const inputNameProfile = document.querySelector("#input-nameProfile"); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector("#input-descriptionProfile"); //поле ввода описания профиля
const nameProfile = document.querySelector(".profile__name"); // имя профиля описание профиля
const descriptionProfile = document.querySelector(".profile__description"); // описание профиля
const inputNameImage = document.querySelector("#input-nameImage"); // поле ввода названия картинки
const inputLinkImage = document.querySelector("#input-linkImage"); // поле ввода ссылки на картинку
const popups = Array.from(document.querySelectorAll(".popup"));

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

const classNames = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__errorMessage_active',
  errorId: '-error'
}

/* Объявления функций */

// функция создание карточек
function createCard(item) {
  const card = new Card(item, "#element-item-template"); // Созд экземпляр карточки арг (объект и селектор)
  return card.generateCard();  // Создаём карточку и возвращаем наружу
}

// функция добавления карточек в DOM
function renderCard(Card) {
  cardsContainer.prepend(Card);
}

/* Основной код */

new FormValidator(classNames, formEdit).enableValidation();
new FormValidator(classNames, formAdd).enableValidation();

// наполняю страницу элементами из начального массива
initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  renderCard(cardElement);   // Добавляем в DOM
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
  formAdd.reset();
});
formAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newCards = {};
  newCards.name = inputNameImage.value;
  newCards.link = inputLinkImage.value;

  const newCardElement = createCard(newCards);
  renderCard(newCardElement); // отображаю на странице cозданные карточки

  closePopup(popupAdd);
  evt.target.reset(); // очищаю форму
});
