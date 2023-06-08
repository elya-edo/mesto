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
  createCard(item.name, item.link);
});


const buttonEditProfile = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddProfile = document.querySelector('.profile__add-button'); // кнопка добавления карточек
const ViewImage = document.querySelectorAll('.elements__image'); // кнопка просмотра картинки
const popup = document.querySelectorAll('.popup'); // окна попапов
const buttonСlosePopup = document.querySelectorAll('.popup__close-button'); // кнопки закрытия попапа
const popupForm = document.querySelectorAll('.popup__form'); // формы
const inputNameProfile = document.querySelector('#input-nameProfile'); // поле ввода имени профиля
const inputDescriptionProfile = document.querySelector('#input-descriptionProfile'); //поле ввода описания профиля
const nameProfile = document.querySelector('.profile__name'); // имя профиля описание профиля
const descriptionProfile = document.querySelector('.profile__description'); // описание профиля

const titlePicturePopup = document.querySelector('.popup__picture-title'); // название карточки в попапе
const titleElements = document.querySelectorAll('.elements__title'); // название карточки в верстке
const PicturePopup = document.querySelector('.popup__picture'); // картинка карточки в попапе

const inputNameImage = document.querySelector('#input-nameImage'); // поле ввода названия картинки
const inputLinkImage = document.querySelector('#input-linkImage'); // поле ввода ссылки на картинку


const buttonLikeElement = document.querySelectorAll('.elements__like-button'); // кнопка лайка
const buttonDeliteElement = document.querySelectorAll('.elements__delite-button'); // кнопка удаления


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

  // отображаю на странице - кладу клонированный элемент(cloneElement) с добавленными предыдущей строчке свойствами в контейнер (elements)
  elements.prepend(cloneElement);
}



//для попапа редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  openPopup(popup[0]);
  inputNameProfile.value = nameProfile.textContent;              // заполняю форму при открытии данными из профиля
  inputDescriptionProfile.value = descriptionProfile.textContent;//заполняю форму при открытии данными из профиля
});
buttonСlosePopup[0].addEventListener('click', function () {
  closePopup(popup[0]);
});
popupForm[0].addEventListener('submit', function (evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNameProfile.value;
  descriptionProfile.textContent = inputDescriptionProfile.value;
  closePopup(popup[0]);
});


//для попапа добавления карточек
buttonAddProfile.addEventListener('click', function () {
  openPopup(popup[1]);
});
buttonСlosePopup[1].addEventListener('click', function () {
  closePopup(popup[1]);
});
popupForm[1].addEventListener('submit', function (evt) {
  evt.preventDefault();
   createCard(inputNameImage.value, inputLinkImage.value);
   closePopup(popup[1]);
});


//для попапа картинки
for (let i = 0; i < ViewImage.length; i++) {      // использую цикл for тк нужен индекс текущего элемента
  ViewImage[i].addEventListener('click', function () {
    openPopup(popup[2]);
    titlePicturePopup.textContent = titleElements[i].textContent  // заполняю данными из карточки
    PicturePopup.src = ViewImage[i].src  // заполняю данными из карточки
  });
}
buttonСlosePopup[2].addEventListener('click', function () {
  closePopup(popup[2]);
});




// поставить/снять лайк
buttonLikeElement.forEach(function (item)  {
  item.addEventListener('click', function () {
    item.classList.toggle('elements__like-button_active')
  });
});

// удаление карточки
buttonDeliteElement.forEach(function (item)  {
  item.addEventListener('click', function () {
    const cardItem = item.closest('.elements__element'); // метод closest возвращает ближайший родительский элемент с переданным селектором
    cardItem.remove();
  });
});
