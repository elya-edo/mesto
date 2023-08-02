import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector(".profile__add-button"); // кнопка добавления карточек

//любую форму можно сразу получить из document.forms по уникальному атрибуту name, который указываются в тегах form
const formEdit = document.forms["edit-form"]; // форма редактирования
const formAdd = document.forms["add-form"]; // форма добавления

const inputNameProfile = document.querySelector("#input-nameProfile"); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector("#input-descriptionProfile"); //поле ввода описания профиля

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

/* Объявление функций */
function createCard(CardItem) {
  const card = new Card(CardItem, "#element-item-template", function(name, link, alt) {
    popupWithImageClass.open(name, link, alt);
    }
  ); // Созд экземпляр карточки арг (объект, селектор, ф-я открытия попапа картинки)
  return card.generateCard();  // Создаём карточку и возвращаем наружу
}

/* Основной код */

// Валидация
const validatorFormformAdd = new FormValidator(classNames, formAdd);
validatorFormformAdd.enableValidation();
const validatorFormEdit = new FormValidator(classNames, formEdit);
validatorFormEdit.enableValidation();


const cardList = new Section({
  items: initialCards,
  renderer: (CardItem) => {
    const newCard = createCard(CardItem); // готовая карточка
    cardList.addItem(newCard); // добавляю в контейнер
    },
  },
  '.elements'
);
// наполняю страницу элементами из начального массива
cardList.renderItems();


//для попапа открытия картинки
const popupWithImageClass = new PopupWithImage('.popup_type_image');
popupWithImageClass.setEventListeners();


//для попапа редактирования профиля
const userInfoClass = new UserInfo({ selectorName: '.profile__name', selectorDescription: '.profile__description'});
const popupWithFormEditClass = new PopupWithForm({ selectorPopup: '.popup_type_edit', submitFunc: (input) => {
  userInfoClass.setUserInfo(input['name-profile'], input['description-profile']); // принимает новые данные пользователя и добавляет их на страницу.
}});
buttonEditProfile.addEventListener("click", function () {
  popupWithFormEditClass.open();
  const userInfo = userInfoClass.getUserInfo(); // возвращает объект с данными пользователя чтобы подставить в форму при открытии
  inputNameProfile.value = userInfo.name; // заполняю форму при открытии данными из профиля
  inputDescriptionProfile.value = userInfo.description; //заполняю форму при открытии данными из профиля
});
popupWithFormEditClass.setEventListeners();


//для попапа добавления карточек
const popupWithFormAddClass = new PopupWithForm({ selectorPopup: '.popup_type_add', submitFunc: (input) => {
  const newCards = {};
  newCards.name = input['name-place'];
  newCards.link = input['link-picture'];
  const newCard = createCard(newCards);
  cardList.addItem(newCard);
}});
buttonAddProfile.addEventListener("click", function () {
  popupWithFormAddClass.open();
  validatorFormformAdd.toggleButtonState();
});
popupWithFormAddClass.setEventListeners();
