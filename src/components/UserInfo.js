/*Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
    Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.

    Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
    Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.

    Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.*/


export default class UserInfo {
    constructor(name, job) {

        this._name = document.querySelector(name);//нашли элемент имени на странице
        this._job = document.querySelector(job); //нашли элемент работы на старинце
    }

    getUserInfo() {
        this._UserInfoData = {}; //создали массив нэйм которого равен строчке формы при открытии попапа
        this._UserInfoData.name = this._name.textContent
        this._UserInfoData.job = this._job.textContent
        return this._UserInfoData


    }
    setUserInfo (data) {
        this._name.textContent = data['name-input']
        this._job.textContentdata = ['job-input']
    }
}

