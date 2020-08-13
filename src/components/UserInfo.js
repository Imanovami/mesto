export default class UserInfo {
    constructor(name, job) {
        this._name = document.querySelector(name);
        this._job = document.querySelector(job);
    }

    getUserInfo() {
        this._userInfoData = {};
        this._userInfoData.name = this._name.textContent;
        this._userInfoData.job = this._job.textContent;
        return this._userInfoData;
    }

    setUserInfo (data) {
        this._name.textContent = data['name-input']
        this._job.textContent = data['job-input']
    }
}

