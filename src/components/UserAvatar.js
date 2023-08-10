export class UserAvatar {
  constructor(selectorAvatar) {
    this._avatar = document.querySelector(selectorAvatar);
  }

  // метод принимает ссылку на аватар и добавляет его на страницу.
  setAvatar(link) {
    this._avatar.src = link;
  }
}
