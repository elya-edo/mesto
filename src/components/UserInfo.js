const inputNameProfile = document.querySelector("#input-nameProfile"); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector("#input-descriptionProfile"); //поле ввода описания профиля
const nameProfile = document.querySelector(".profile__name"); // имя профиля описание профиля *
const descriptionProfile = document.querySelector(".profile__description"); // описание профиля *

export class UserInfo {
  constructor({ selectorName, selectorDescription }) { //(селектор имени пользователя и информации о себе)
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
  }

  // метод  возвращает объект с данными пользователя. Пригодится чтобы подставить в форму при открытии.
  getUserInfo() {
    inputNameProfile.value = this._name.textContent; // заполняю форму при открытии данными из профиля
    inputDescriptionProfile.value = this._description.textContent; //заполняю форму при открытии данными из профиля
    return { inputNameProfile, inputDescriptionProfile };
  }

  // метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, description) {
    nameProfile.textContent = name;
    descriptionProfile.textContent = description;
  }
}


