export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
        this._handleClickClose = this._handleClickClose.bind(this);
        this._handleKeydownClose = this._handleKeydownClose.bind(this);
    }


    _handleKeydownClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose(event) {
        if (event.target === event.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.addEventListener('click', this._handleClickClose);
    }

    _removeEventListeners() {
        this._popupElement.removeEventListener('click', this._handleClickClose);
    }

    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleKeydownClose);  //добавила
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleKeydownClose);  //добавила
    }
}