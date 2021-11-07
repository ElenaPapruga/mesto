// Класс Section отвечает за отрисовку элементов на странице
export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    //класс Section - отвечает за отрисовку элементов на странице (отрисовывает разметку, которую возвращает Card)


    // renderItems - отвечает за отрисовку всех элементов
    renderItems = () => {
        this._items.forEach(item => {
            this._renderer(item); // вызываем renderer, передав item
        })
    }

    //addItem - принимает DOM-элемент и добавляет его в контейнер
    addItem = (element) => {
        this._container.append(element);
    }
}

