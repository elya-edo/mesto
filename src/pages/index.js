import './index.css'; // добавьте импорт главного файла стилей
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithWarning } from '../components/PopupWithWarning.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { UserAvatar } from '../components/UserAvatar.js';


const buttonEditProfile = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector(".profile__add-button"); // кнопка добавления карточек
const buttonUpdateAvatar = document.querySelector(".profile__edit-avatar"); // кнопка редактирования аватара

//любую форму можно сразу получить из document.forms по уникальному атрибуту name, который указываются в тегах form
const formEdit = document.forms["edit-form"]; // форма редактирования
const formAdd = document.forms["add-form"]; // форма добавления
const formUpdateAvatar = document.forms["update-avatar-form"]; // форма обновления аватара

const inputNameProfile = document.querySelector("#input-nameProfile"); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector("#input-descriptionProfile"); //поле ввода описания профиля

const classNames = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__errorMessage_active',
  errorId: '-error'
}


/* Объявление функций */

function createCard(CardItem, CardItemId) {
  const card = new Card(CardItem, "#element-item-template",
  function(name, link) {    // ф-я открывающая попап картинки, вызывается при клике на картинку
    popupWithImageClass.open(name, link);
    },
    function() {  // ф-я открывающая предупреждение, вызывается при клике на кнопку удаления карточки
      popupWarning.open();
      popupWarning.setEventListeners(function() {
        api.deleteCard(CardItemId) // // удаление карточки с сервера
            .then((json) => {
              card.deleteElement();
              popupWarning.close(); // чтобы сначала удалился а потом закрылся попап
            })
            .catch((err) => {
              console.error(err); // выведем ошибку в консоль
              popupWarning.close();
              alert("Не удалось совершить действие"); //уведобляю пользователя что действие не удалось
            });
      });
      }
  ); // Созд экземпляр карточки арг (объект, селектор, ф-я, ф-я)

  return card.generateCard(function() {   // поставить лайк на сервере
    api.addLike(CardItemId)
            .then((json) => {
              card.likeElement();  // добавляю закрашивание сердечка
              card.changeQuantityLikes(json.likes.length);  // меняю количество лайков
            })
            .catch((err) => {
              console.error(err);
              alert("Не удалось совершить действие");
            });
    },
    function() {   // снять лайк на сервере
      api.deleteLike(CardItemId)
            .then((json) => {
              card.likeElement();  // убираю закрашивание сердечка
              card.changeQuantityLikes(json.likes.length); // меняю количество лайков
            })
            .catch((err) => {
              console.error(err);
              alert("Не удалось совершить действие");
            });
    }
  );  // Создаём карточку и возвращаем наружу
}

function createSectionClass(objectCard) {
  const cardList = new Section({
    items: objectCard,
    renderer: (CardItem) => {
      const newCard = createCard(CardItem, CardItem._id); // готовая карточка
      cardList.addItem(newCard); // добавляю в контейнер
      },
    },
    '.elements'
  );
  return cardList;
}


/* Основной код */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: '4238b8e6-a256-446f-a735-e69279f00fb6',
    'Content-Type': 'application/json'
  }
});

// Загрузка информации о пользователе и карточек с сервера
const firstPromise = api.getUserInfo() // Загрузка информации о пользователе с сервера
const secondPromise = api.getInitialCards() // Загрузка карточек с сервера
Promise.all([firstPromise, secondPromise]) // объединяю в Promise.all
  .then((results) => {
    userInfoClass.setUserInfo(results[0].name, results[0].about); // принимает новые данные пользователя и добавляет их на страницу.
    UserAvatarClass.setAvatar(results[0].avatar); // добавляю аватар пользователя
    createSectionClass(results[1]).renderItems(); // добавляю карточки
  })
  .catch((err) => {
    console.error(err);
    alert("Не удалось загрузить данные");
  });


// Валидация
const validatorFormformAdd = new FormValidator(classNames, formAdd);
validatorFormformAdd.enableValidation();
const validatorFormEdit = new FormValidator(classNames, formEdit);
validatorFormEdit.enableValidation();
const validatorFormUpdateAvatar = new FormValidator(classNames, formUpdateAvatar);
validatorFormUpdateAvatar.enableValidation();


// Класс отвечающий за аватар пользователя
const UserAvatarClass = new UserAvatar('.profile__avatar');
// Класс отвечающий за информацию о пользователе
const userInfoClass = new UserInfo({ selectorName: '.profile__name', selectorDescription: '.profile__description'});


//для попапа открытия картинки
const popupWithImageClass = new PopupWithImage('.popup_type_image');
popupWithImageClass.setEventListeners();

// попап предупреждения об удалении карточки
const popupWarning = new PopupWithWarning('.popup_type_warning');


//для попапа редактирования профиля
const popupWithFormEditClass = new PopupWithForm({ selectorPopup: '.popup_type_edit', submitFunc: (input) => {
  api.sendUserInfo(input['name-profile'], input['description-profile']) // Сохранение отредактированных данных профиля на сервере
  .then((json) => {
    userInfoClass.setUserInfo(input['name-profile'], input['description-profile']); // принимает новые данные пользователя и добавляет их на страницу.
    popupWithFormEditClass.close();
  })
  .catch((err) => {
    console.error(err);
    popupWithFormEditClass.close();
    alert("Не удалось совершить действие");
  });
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
  const newCards = {
    name: input['name-place'],
    link: input['link-picture'],
    likes: [],
    owner: {
      _id: '839e9c3449529c67f8d9516a'
    }
  };
  api.sendNewCard(input['name-place'], input['link-picture']) // Добавление новой карточки
  .then((json) => {
    const newCard = createCard(newCards, json._id);
    createSectionClass(json).addItem(newCard); // добавляю новую карточку на страницу - вызываю ф-ю createSectionClass, а потом метод .addItem()
    popupWithFormAddClass.close();
  })
  .catch((err) => {
    console.error(err);
    popupWithFormAddClass.close();
    alert("Не удалось совершить действие");
  });
}});
buttonAddProfile.addEventListener("click", function () {
  popupWithFormAddClass.open();
  validatorFormformAdd.toggleButtonState();
});
popupWithFormAddClass.setEventListeners();


// для попапа обновления аватара
const popupWithFormAvatarClass = new PopupWithForm({ selectorPopup: '.popup_type_update-avatar', submitFunc: (input) => {
  api.changeAvatar(input['update-avatar']) // Замена аватара пользователя
  .then((json) => {
    UserAvatarClass.setAvatar(json.avatar); // добавляю аватар пользователя
    popupWithFormAvatarClass.close();
  })
  .catch((err) => {
    console.error(err);
    popupWithFormAvatarClass.close();
    alert("Не удалось совершить действие");
  });
}});
buttonUpdateAvatar.addEventListener("click", function () {
  popupWithFormAvatarClass.open();
  popupWithFormAvatarClass.setEventListeners()
});
