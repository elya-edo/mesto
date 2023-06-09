const template = document.querySelector('#element-item-template'); // заготовка карточки
const templateContent = template.content; // получили содержимое template
const element = templateContent.querySelector('.elements__element'); // карточка, тег article
const elements = document.querySelector('.elements'); // контейнер для карточек в html

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


// наполняю страницу элементами из начального массива
initialCards.forEach(function (item)  {
  const initialCards = createCard(item.name, item.link);   // кладу в переменную результат функции
  elements.prepend(initialCards);                    // отображаю на странице cозданные карточки
});

const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector('.profile__add-button'); // кнопка добавления карточек
// const viewImages = document.querySelectorAll('.elements__image'); // нажать на картинку для просмотра

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



//Функции
function openPopup(popup){
  popup.classList.add('popup_opened');
}
function closePopup(popup){
  popup.classList.remove('popup_opened');
}

function createCard(name, link){
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
    // console.log(titlePicturePopup);
    titlePicturePopup.textContent = name;  // заполняю данными из карточки
    picturePopup.src = link;  // заполняю данными из карточки
    picturePopup.alt = `${name}`;
  });

  return cloneElement
}




//универсальное закрытие всех попапов - обработчики крестиков
buttonСlosePopups.forEach((button) => {
  const popup = button.closest('.popup');     // находим 1 раз ближайший к крестику попап
  button.addEventListener('click', () => closePopup(popup)); // уст обработчик закрытия на крестик
});


//для попапа редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  openPopup(popupEdit);
  inputNameProfile.value = nameProfile.textContent;              // заполняю форму при открытии данными из профиля
  inputDescriptionProfile.value = descriptionProfile.textContent;//заполняю форму при открытии данными из профиля
});
formEdit.addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNameProfile.value;
  descriptionProfile.textContent = inputDescriptionProfile.value;
  closePopup(popupEdit);
});


//для попапа добавления карточек
buttonAddProfile.addEventListener('click', function () {
  openPopup(popupAdd);
});
formAdd.addEventListener('submit', function (evt) {
  evt.preventDefault();
   newCards = createCard(inputNameImage.value, inputLinkImage.value);  // кладу в переменную результат функции
   elements.prepend(newCards);      // отображаю на странице cозданные карточки
   closePopup(popupAdd);
   evt.target.reset()               // очищаю форму
});
