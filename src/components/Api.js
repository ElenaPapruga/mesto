// Класс Api

export class Api {
    constructor(options) {
        this.url = options.url;
        this.headers = options.headers
    }

    _setResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }


    //1. Загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => this._setResponse(res));
    }

    //2. Загрузка начальных карточек с сервера
    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers,
        })
            .then(res => this._setResponse(res))
    }

    // 1.+2. Объединение двух запросов (пп. №1+2) в один промис для одновременной обработки
    getInitialData() {
        return Promise.all([this.getUserInfo(), this.getInitialCards()]);
    }

    // 3. Обновление/Редактирование профиля
    setUserInfo(data) {
        return fetch(`${this.url}/cards/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => this._setResponse(res));
    }

    //9. Обновление аватара пользователя
    setAvatar(data) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({ avatar: data.avatar })
        })
            .then(res => this._setResponse(res));
    }

    // 4. Добавление новой карточки на сервер
    postNewCard(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => this._setResponse(res));
    }

    //7. Удаление карточки
    deleteCard(data) {
        return fetch(`${this.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._setResponse(res));
    }

    //8. Постановка Лайка
    setLike(data) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => this._setResponse(res));
    }

    //8. Снятие Лайка
    deleteLike(data) {
        return fetch(`${this.url}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => this._setResponse(res));
    }
}
