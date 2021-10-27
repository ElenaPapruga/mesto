export class Card {
    constructor(data, cardSelector, handleCardClick) { // добавили второй параметр
        this._link = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector; //  конструктор принимает два параметра — объект с данными и селектор template-элемента
        this._handleCardClick = handleCardClick.handleCardClick;
    }


    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__heart').addEventListener('click', () => this._handleHeartClick());
        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick());
    }


    //Публичный метод generateCard() подготовливает карточку к публикации. Он добавит данные в разметку и управляет поведением карточек
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._handleHeartClick();
        this._deleteSetEventListeners();
        this._handleCardClickImage();
        this._setEventListeners();

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
    _handleCardClickImage() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
}