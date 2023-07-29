import './index.css'; // добавьте импорт главного файла стилей 
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector(".profile__add-button"); // кнопка добавления карточек

//любую форму можно сразу получить из document.forms по уникальному атрибуту name, который указываются в тегах form
const formEdit = document.forms["edit-form"]; // форма редактирования
const formAdd = document.forms["add-form"]; // форма добавления

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

/* Основной код */

const validatorFormformAdd = new FormValidator(classNames, formAdd);
validatorFormformAdd.enableValidation();
const validatorFormEdit = new FormValidator(classNames, formEdit);
validatorFormEdit.enableValidation();

const PopupClassEdit = new Popup('.popup_type_edit');
PopupClassEdit.setEventListeners();
const PopupClassAdd = new Popup('.popup_type_add');
PopupClassAdd.setEventListeners();
const PopupClassImage = new Popup('.popup_type_image');
PopupClassImage.setEventListeners();

const PopupWithImageClass = new PopupWithImage('.popup_type_image');

const UserInfoClass = new UserInfo({ selectorName: '.profile__name', selectorDescription: '.profile__description'});


// наполняю страницу элементами из начального массива
const cardList = new Section({
  items: initialCards,
  renderer: (CardItem) => {
    const card = new Card(CardItem, "#element-item-template", function(Name, Link, Alt) {
        PopupWithImageClass.open(Name, Link, Alt);
      }
    ); // Созд экземпляр карточки арг (объект, селектор, ф-я открытия попапа картинки)
    const CardElement = card.generateCard();  // Создаём карточку и возвращаем наружу

    cardList.addItem(CardElement); // добавляю в контейнер
    },
  },
  '.elements'
);
cardList.renderItems();


//для попапа редактирования профиля
buttonEditProfile.addEventListener("click", function () {
  PopupClassEdit.open();
  UserInfoClass.getUserInfo(); // возвращает объект с данными пользователя чтобы подставить в форму при открытии
});
const PopupWithFormEditClass = new PopupWithForm({ selectorPopup: '.popup_type_edit', SubmitFunc: (input) => {
  UserInfoClass.setUserInfo(input['name-profile'], input['description-profile']); // принимает новые данные пользователя и добавляет их на страницу.
}});
PopupWithFormEditClass.setEventListeners();


//для попапа добавления карточек
buttonAddProfile.addEventListener("click", function () {
  PopupClassAdd.open();
  validatorFormformAdd.toggleButtonState();
});
const PopupWithFormAddClass = new PopupWithForm({ selectorPopup: '.popup_type_add', SubmitFunc: (input) => {
  const newCards = {};
  newCards.name = input['name-place'];
  newCards.link = input['link-picture'];

  const newCardElement = new Section({
    items: [newCards],
    renderer: (CardItem) => {
      const card = new Card(CardItem, "#element-item-template", function(Name, Link, Alt) {
        PopupWithImageClass.open(Name, Link, Alt);
        }
      ); // // Созд экземпляр карточки арг (объект, селектор, ф-я открытия попапа картинки)
      const CardElement = card.generateCard();  // Создаём карточку и возвращаем наружу

      newCardElement.addItem(CardElement); // добавляю в контейнер
      },
    },
    '.elements'
  );
  newCardElement.renderItems();
}});
PopupWithFormAddClass.setEventListeners();
