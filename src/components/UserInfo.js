export class UserInfo {
  constructor({ selectorName, selectorDescription }) { //(селектор имени пользователя и информации о себе)
    this._name = document.querySelector(selectorName);
    this._description = document.querySelector(selectorDescription);
  }

  // метод  возвращает объект с данными пользователя. Пригодится чтобы подставить в форму при открытии.
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._description.textContent;
    return userInfo;
  }

  // метод принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}


