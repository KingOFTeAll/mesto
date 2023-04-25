export class UserInfo {
    constructor({nameSelector, dataSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._dataElement = document.querySelector(dataSelector);
    }
  
    getUserInfo() {
      return {
        userName: this._nameElement.textContent,
        userStatus: this._dataElement.textContent
      }
    }
  
    setUserInfo({ userName, userStatus }) {
      this._nameElement.textContent = userName;
      this._dataElement.textContent = userStatus;
    }
  }