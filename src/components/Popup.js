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
        document.addEventListener('keydown', this._handleKeydownClose);
    }

    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleKeydownClose);
    }
}









//     constructor(popupSelector) {
//         this._popupElement = document.querySelector(popupSelector);
//         this._handleEscClose = this._handleEscClose.bind(this);
//     }

//     open() {
//         this._popupElement.classList.add('popup_opened');
//         document.addEventListener('keyup', this._handleEscClose);
//     }

//     close() {
//         this._popupElement.classList.remove('popup_opened');
//         document.removeEventListener('keyup', this._handleEscClose);
//     }

//     setEventListeners() {
//         this._popupElement.addEventListener('click', (event) => {
//             if (event.target.classList.contains('popup') || event.target.classList.contains('popup_close')) {
//                 this.close();
//             }
//         });
//     }

//     _handleEscClose(event) {
//         if (event.key === 'Escape') {
//             this.close();
//         }
//     }
// }
