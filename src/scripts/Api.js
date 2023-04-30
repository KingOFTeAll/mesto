export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if(res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getMyMass() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getMyMass()])
  }

  postNewCard(cardData) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      body: JSON.stringify(cardData),
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  setAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({avatar}),
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }

  getIsLiked(cardId, isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._checkResponse(res)
    })
  }
}