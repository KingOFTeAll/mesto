export class Card {
  constructor({ cardData, handleCardClick }, templateSelector) {
      this._cardData = cardData;
      this._card = this._getCardTemplate(templateSelector);
      this._cardLikeButton = this._card.querySelector('.elements__like');
      this._cardDeleteButton = this._card.querySelector('.elements__trash');
      this._cardImage = this._card.querySelector('.elements__image');
      this._cardTitle = this._card.querySelector('.elements__caption');
      this._cardElement = this._createCard();
      this._handleCardClick = handleCardClick;
      this._setEventListeners();
  };

  _getCardTemplate(templateSelector) {
      return document
          .querySelector(templateSelector)
          .content
          .querySelector('.elements__item')
          .cloneNode(true);
  };
  
  _createCard() {
      this._cardImage.src = this._cardData.link;
      this._cardImage.alt = this._cardData.name;
      this._cardTitle.textContent = this._cardData.name;
      return this._card
  };

  _deleteCard() { 
      this._card.remove();
  };

  _toggleCardLike() {
      this._cardLikeButton.classList.toggle('elements__like_active');
  };

  _setEventListeners() {
      this._cardLikeButton.addEventListener('click', () => this. _toggleCardLike());
      this._cardDeleteButton.addEventListener('click', () => this._deleteCard());
      this._cardImage.addEventListener('click', () => {
          this._handleCardClick({
            name: this._cardData.name,
            link: this._cardData.link
          })
      });
  };

  getCard() {
      return this._cardElement
  };
}
