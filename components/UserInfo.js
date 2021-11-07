//UserInfo отвечает за управление отображением информации о пользователе на странице 
export class UserInfo {
    constructor(userSelector) {
        this.name = userSelector.name;
        this.about = userSelector.about;
        this.avatar = userSelector.avatar;
    }

    //getUserInfo - возвращает объект с данными пользователя
    getUserInfo() {
        const data = {
            name: this.name,
            about: this.about,
            avatar: this.avatar
        };
        return data;
    }

    //setUserInfo - принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this.name = data.name;
        this.about = data.about;
    }

    setUserAvatar(link) {
        this._avatar.src = link;
    }
    setUserId(id) {
        this._userId = id;
    }
}