export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._id = data._id;
        this._likes = data.likes;
        this._currentUserId = data.currentUserId;
        this._ownerId = data.ownerId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick.handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.addEventListener('submit', (event) => {

            this._element.reset();
        })
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

    isLiked() {
        return Boolean(this._likes.find(user => user._id === this._currentUserId));
    }

    getId() {
        return this._id;
    }

    _updateLikes() {
        this._element.querySelector('.element__heart').textContent = this._likes.length;

        if (this.isLiked()) {
            this._likeButtonElement.classList.add('element__heart_active');
        } else {
            this._likeButtonElement.classList.remove('element__heart_active');
        }
    }

    setLikes(likes) {
        this._likes = likes;
        this._updateLikes();
        this._element.querySelector('.element__heart-number').textContent = String(this._likes.length);
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    _checkUserLike() {
        return this._likes.some((element) => element._id === this._currentUserId)
    }


    // Клик по фото
    _handleCardClickImage() {
        this._element.querySelector('.element__photo').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    //метод generateCard() подготовливает карточку к публикации. Он добавит данные в разметку и управляет поведением карточек
    generateCard() {
        this._element = this._getTemplate();
        this._handleHeartClick();
        this._deleteSetEventListeners();
        this._handleCardClickImage();
        this._setEventListeners();
        this._element.querySelector('.element__delete-button').classList.add(
            this._currentUserId === this._ownerId ? 'element__delete-button_visible' : 'element__delete-button_hidden'
        )
        // this._updateLikes();

        this._likeButtonElement = this._element.querySelector('.element__heart');

        this._element.querySelector('.element__photo').src = this._link;
        this._element.querySelector('.element__photo').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;
        return this._element;
    }
}