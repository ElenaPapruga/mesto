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

    //     _setEventListeners() {
    //         this._handleHeartClick();
    //         this._deleteSetEventListeners();
    //         this._handleCardClick();
    //     }


    _setEventListeners() {
        // при сабмите формы
        this._element.addEventListener('submit', (event) => {
            // отменим стандартное поведение
            event.preventDefault();

            // и сбросим её поля
            this._element.reset();
        })
    }

    //Публичный метод generateCard() подготовливает карточку к публикации. Он добавит данные в разметку и управляет поведением карточек
    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();

        // Добавим данные       
        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        // Вернём элемент наружу
        return this._element;
    }

//     //Приватный метод _getTemplate() научит класс Card возвращать разметку. Мы вызовем его внутри класса, чтобы получить готовую разметку перед размещением на страницу
//     _getTemplate() {
//         // здесь выполним все необходимые операции, чтобы вернуть разметку
//         // забираем разметку из HTML и клонируем элемент
//         // Задача метода _getTemplate — вернуть разметку карточки через return

//         const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element__card').cloneNode(true);

//         // вернём DOM-элемент карточки
//         return cardElement;
//     }



    _setEventListeners() {
        this._handleHeartClick();
        this._deleteSetEventListeners();
        this._handleCardClickImage();
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