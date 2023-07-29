// Класс Section отвечает за отрисовку элементов на странице. У него нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
export class Section {
  constructor({ items, renderer }, selector) {
    this._initialArray = items;
    this._renderer = renderer; // renderer — это функция
    this._container = document.querySelector(selector);
    // Первым параметром конструктора принимает объект с двумя свойствами: items и renderer
    // items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    // Свойство renderer — это функция, которая отвечает за создание и о трисовку каждого отдельного элемента на странице.
    // Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы
  }

  // Метод отвечает за отрисовку всех элементов.
  renderItems() {
    this._initialArray.forEach(item => this._renderer(item));
  }

  // метод принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }
}
