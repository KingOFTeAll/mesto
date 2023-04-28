export class Card {
  constructor({ cardData, handleCardClick, handleDeleteClick, handleLikeClick, userId }, templateSelector) {
      this._cardData = cardData;
      this._userId = userId;
      this._card = this._getCardTemplate(templateSelector);
      this._cardLikeButton = this._card.querySelector('.elements__like');
      this._cardDeleteButton = this._card.querySelector('.elements__trash');
      this._cardImage = this._card.querySelector('.elements__image');
      this._cardTitle = this._card.querySelector('.elements__caption');
      this._heartMeter = this._card.querySelector('.elements__like-counter');
      this._cardElement = this._createCard();
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteClick = handleDeleteClick;
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
      if(this._cardData.likes.lenght) {
        this._heartMeter.textContent = this._cardData.likes.lenght;
    }
      return this._card
  };

  _deleteCard() { 
      this._card.remove();
  };

  _toggleCardLike() {
      return this._cardData.likes.find(item => item._id === this._userId);
  };

  _updateLikeMeter() {
    this._heartMeter.textContent = this._cardData.likes.length;
    if (this.isLiked()) {
        this._cardLikeButton.classList.add('card__heart_active');
    }
    else {
        this._cardLikeButton.classList.remove('card__heart_active');
    }
};

addLike(data) {
    this._cardData = data;
    this._updateLikeMeter();
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
