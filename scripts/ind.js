'use strict';

import * as all from './consts.js';
import Card from './Cards.js';

all.profileFormValidator.enableValidation();
all.addCardFormValidator.enableValidation();

function addDefaultCards(elements) {
  elements.forEach((cardElement) => {
    renderCard(createCard(cardElement, all.cardSetting));
  })
}

function renderCard(card) {
  all.cardsContainer.prepend(card);
}

function createCard(name, link) {
  const card = new Card(name, link);
  return card.generateCard();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
  document.addEventListener("click", handleCloseByClick);
}

 function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", handleEscape);
    document.removeEventListener("click", handleCloseByClick);
  };

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'))
  }
}

function handleCloseByClick(evt){
   
    if (
      evt.target == evt.currentTarget ||
      evt.target.classList.contains("popup__close-img")
    ) {
      closePopup(evt.currentTarget);
    }
  }

function handleCardFormSubmit(evt) {
  const cardData = {
    name: all.inputAddPlaceName.value,
    link: all.inputAddPlaceLink.value
  }

  evt.target.reset();
  all.addCardFormValidator.disableSubmitButton();

  renderCard(createCard(cardData, all.cardSetting));
  closePopup(all.popupPlaceElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  all.profileName.textContent = all.inputProfileName.value;
  all.profileStatus.textContent = all.inputProfileStatus.value;

  closePopup(all.popupProfileEditElement);
}

function openProfileEditPopup(evt) {
  evt.preventDefault();

  all.inputProfileName.value = all.profileName.textContent;
  all.inputProfileStatus.value = all.profileStatus.textContent;

  all.profileFormValidator.checkInputValidity();
  openPopup(all.popupProfileEditElement);
}


all.popupElements.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-img'))) {
      closePopup(popup)
    }
  })
})

all.profileEditOpenElement.addEventListener('click', openProfileEditPopup);

all.profileAddPlaceElement.addEventListener('click', () => {
  openPopup(all.popupPlaceElement);
});

all.formProfilePopup.addEventListener('submit', handleProfileFormSubmit);
all.formPlacePopup.addEventListener('submit', handleCardFormSubmit);

addDefaultCards(all.massiveElementsPlaces);

export { openPopup }
