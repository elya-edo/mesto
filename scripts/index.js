const template = document.querySelector('#element-item-template'); // заготовка карточки
const templateContent = template.content; // получили содержимое template
const element = templateContent.querySelector('.elements__element'); // карточка, тег article
const elements = document.querySelector('.elements'); // контейнер для карточек в html

const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector('.profile__add-button'); // кнопка добавления карточек

const popupEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля
const popupAdd = document.querySelector('.popup_type_add'); // попап добавления карточек
const popupImage = document.querySelector('.popup_type_image'); // попап попап просмотра картинки

const buttonСlosePopups = document.querySelectorAll('.popup__close-button'); // кнопки закрытия попапа

const formEdit = document.querySelector('#edit-form'); // форма редактирования
const formAdd = document.querySelector('#add-form'); // форма добавления

const inputNameProfile = document.querySelector('#input-nameProfile'); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector('#input-descriptionProfile'); //поле ввода описания профиля

const nameProfile = document.querySelector('.profile__name'); // имя профиля описание профиля
const descriptionProfile = document.querySelector('.profile__description'); // описание профиля

const titlePicturePopup = document.querySelector('.popup__picture-title'); // название карточки в попапе
const picturePopup = document.querySelector('.popup__picture'); // картинка карточки в попапе

const inputNameImage = document.querySelector('#input-nameImage'); // поле ввода названия картинки
const inputLinkImage = document.querySelector('#input-linkImage'); // поле ввода ссылки на картинку

const errayInputformEdits = [inputNameProfile, inputDescriptionProfile]; // массив полей формы редактирования профиля
const errayInputformAdds = [inputNameImage, inputLinkImage]; // массив полей формы добавления карточек

const buttonSavePopup = document.querySelector('.popup__save-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



/* Объявления функций */

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.body.addEventListener('keydown', closePopupEsc);
  document.body.addEventListener('click', closePopupOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', closePopupEsc);
  document.body.removeEventListener('click', closePopupOverlay);
}

function closePopupEsc(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popupOpen);
  };
}
function closePopupOverlay(evt) {
  const popupOpen = document.querySelector('.popup_opened');
  if (evt.target === popupOpen) {
    closePopup(popupOpen);
  };
}


function createCard(name, link) {
  //клонирую карточку (element)
  const cloneElement = element.cloneNode(true);

  // добавлю клону нужные свойства. В данном случае беру ссылку на картинку из ключа link и назв-е из name.
  cloneElement.querySelector('.elements__title').textContent = name;
  cloneElement.querySelector('.elements__image').src = link;
  cloneElement.querySelector('.elements__image').alt = `${name}`;

  const buttonLikeElement = cloneElement.querySelector('.elements__like-button'); // кнопка лайка
  const buttonDeliteElement = cloneElement.querySelector('.elements__delite-button'); // кнопка удаления
  const viewImage = cloneElement.querySelector('.elements__image'); // нажать на картинку для просмотра

  // поставить/снять лайк
  buttonLikeElement.addEventListener('click', function () {
    buttonLikeElement.classList.toggle('elements__like-button_active');
  });

  // удаление карточки
  buttonDeliteElement.addEventListener('click', function () {
    const cardItem = buttonDeliteElement.closest('.elements__element'); // метод closest возвращает ближайший родительский элемент с переданным селектором
    cardItem.remove();
  });

  //открытие попапа картинки
    viewImage.addEventListener('click', function () {
    openPopup(popupImage);
    titlePicturePopup.textContent = name;  // заполняю данными из карточки
    picturePopup.src = link;  // заполняю данными из карточки
    picturePopup.alt = `${name}`;
  });

  return cloneElement
}


function hideInput(form, errayInputs, classNames) { //ф-я обьединения обьявления функции очищ поля
  errayInputs.forEach(function (item) {
    hideInputError(form, item, classNames);
  });
}



/* Основной код */

// наполняю страницу элементами из начального массива
initialCards.forEach(function (item) {
  const initialCards = createCard(item.name, item.link);   // кладу в переменную результат функции
  elements.prepend(initialCards);                    // отображаю на странице cозданные карточки
});


//универсальное закрытие всех попапов - обработчики крестиков
buttonСlosePopups.forEach((button) => {
  const popup = button.closest('.popup');     // находим 1 раз ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup)); // уст обработчик закрытия на крестик
});


//для попапа редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  hideInput(formEdit, errayInputformEdits, classNames);
  openPopup(popupEdit);
  inputNameProfile.value = nameProfile.textContent;     // заполняю форму при открытии данными из профиля
  inputDescriptionProfile.value = descriptionProfile.textContent;//заполняю форму при открытии данными из профиля
  enableValidation(classNames); // Вызовем функцию кот запустит валидацию
});
formEdit.addEventListener('submit', function (evt) {
  if (!hasInvalidInput(errayInputformEdits, classNames)) { // Если в форме отсутствуют невалидные инпуты
    nameProfile.textContent = inputNameProfile.value;
    descriptionProfile.textContent = inputDescriptionProfile.value;
    closePopup(popupEdit);
  }
  evt.preventDefault();
});


//для попапа добавления карточек
buttonAddProfile.addEventListener('click', function () {
  openPopup(popupAdd);
  hideInput(formAdd, errayInputformAdds, classNames);
  formAdd.reset();
  enableValidation(classNames); // Вызовем функцию кот запустит валидацию
});
formAdd.addEventListener('submit', function (evt) {
  if (!hasInvalidInput(errayInputformAdds, classNames)) { // Если в форме отсутствуют невалидные инпуты
    newCards = createCard(inputNameImage.value, inputLinkImage.value);  // кладу в переменную результат функции
    elements.prepend(newCards);      // отображаю на странице cозданные карточки
    closePopup(popupAdd);
    evt.target.reset()               // очищаю форму
  }
  evt.preventDefault();
});
