let editProfileButton = document.querySelector('.profile__edit-button'); // кнопка редактирования
let popup = document.querySelector('.popup'); // окно попапа
let closePopupButton = document.querySelector('.popup__close-button'); // кнопка закрытия попапа

let nameInput = document.querySelector('#name-input'); // поле для имени
let descriptionInput = document.querySelector('#description-input'); // поле для описания
let nameProfile = document.querySelector('.profile__name'); // имя профиля описание профиля
let descriptionProfile = document.querySelector('.profile__description'); // описание профиля

let popupForm = document.querySelector('.popup__form'); // форма

editProfileButton.addEventListener('click', openPopup);

closePopupButton.addEventListener('click', closePopup);

popupForm.addEventListener('submit', editPopup);



function openPopup(){
  popup.classList.add('popup_opened');
  // заполняю форму при открытии данными из профиля
  nameInput.value = nameProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

function closePopup(){
  popup.classList.remove('popup_opened');
}

function editPopup(evt){
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  popup.classList.remove('popup_opened');
}
