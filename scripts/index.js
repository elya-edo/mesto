let editProfileButton = document.querySelector(".profile__edit-button"); // кнопка редактирования
let Popup = document.querySelector(".popup"); // окно попапа
let closePopupButton = document.querySelector(".popup__close-button"); // кнопка закрытия попапа

let nameInput = document.querySelector("#name-input"); // поле для имени
let descriptionInput = document.querySelector("#description-input"); // поле для описания
let nameProfile = document.querySelector(".profile__name"); // имя профиля описание профиля
let descriptionProfile = document.querySelector(".profile__description"); // описание профиля

let PopupForm = document.querySelector(".popup__form"); // форма

editProfileButton.addEventListener("click", function () {
  Popup.classList.add("popup_opened");
});

closePopupButton.addEventListener("click", function () {
  Popup.classList.remove("popup_opened");
});

// заполняю форму при открытии данными из профиля
nameInput.value = nameProfile.textContent;
descriptionInput.value = descriptionProfile.textContent;

PopupForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  Popup.classList.remove("popup_opened");
});
