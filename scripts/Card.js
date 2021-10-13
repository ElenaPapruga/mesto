import { togglePopup } from './index.js'

const popupImage = document.querySelector('.popup_type_image');

export default class Card {
    constructor(data, cardSelector) { // добавили второй параметр
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector; //  конструктор принимает два параметра — объект с данными и селектор template-элемента
        this._togglePopup = togglePopup;
    }

    //Приватный метод _getTemplate() научит класс Card возвращать разметку. Мы вызовем его внутри класса, чтобы получить готовую разметку перед размещением на страницу
    _getTemplate() {
        // здесь выполним все необходимые операции, чтобы вернуть разметку
        // забираем разметку из HTML и клонируем элемент
        // Задача метода _getTemplate — вернуть разметку карточки через return

        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element__card').cloneNode(true);

        // вернём DOM-элемент карточки
        return cardElement;
    }

    //Публичный метод generateCard() подготовливает карточку к публикации. Он добавит данные в разметку и управляет поведением карточек
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._handleHeartClick(); // добавим обработчики событий
        this._deleteSetEventListeners();
        this._handleCardClick();

        // Добавим данные       
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        // Вернём элемент наружу
        return this._element;
    }

    // Удаление карточки
    _deleteSetEventListeners() {
        this._element.querySelector('.element__delete-button').addEventListener('click', function (event) {
            event.target.closest('.element__card').remove();
        });
    }

    //Лайк
    _handleHeartClick() {
        this._element.querySelector('.element__heart').addEventListener('click', function (event) {
            event.target.classList.toggle('element__heart_active');
        });
    }

    //клик по фото
    _handleCardClick() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._togglePopup(popupImage);
            this._setImagePopupProps();
        });
    }

    //Подмена данных всплывающего окна
    _setImagePopupProps() {
        document.querySelector('.popup__image').src = this._link;
        document.querySelector('.popup__title-image').textContent = this._name;
    }
}
