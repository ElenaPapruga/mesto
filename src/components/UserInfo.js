export class UserInfo {
    constructor(userSelector) {
        this._name = userSelector.profileName.textContent;
        this._caption = userSelector.profileJob.textContent
    }
    //UserInfo отвечает за управление отображением информации о пользователе на странице 
    
    //getUserInfo - возвращает объект с данными пользователя
    getUserInfo() {
        const data = {
            name: this._name,
            caption: this._caption
        };
        return data;
    }

    //setUserInfo - принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(data) {
        this._name = data.name;
        this._caption = data.caption;
    }
}