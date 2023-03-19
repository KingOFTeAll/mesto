'use strict';

import * as all from './consts.js';
import Card from './Cards.js';



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

function openPopup(popup, validForm = null) { // Я решил исправить всё немного другим методом, чтобы валидация накладывалась только на определенные попапы и только при их открытии, а не при загрузке страницы, на мой взгля это позволит быстрее загружать саму страницу
  popup.classList.add('popup_opened');        // так же для открытия попапа картинки этот аргумент не передаются и код не отрабатывает.... не должен
  document.addEventListener('keydown', handleEscape);
  document.addEventListener("click", handleCloseByClick);

 if (validForm) validForm.enableValidation();
}

function clearInputForm(){ //Доп функционал - на мой взгляд, при закрытии формы на крестик или другим методом форма должна чиститься и данные не должны сохраняться(раньше при заполнении формы и нажатии на крестик, а затем повторного открытия данные оставались в инпутах)
  all.formInputList.forEach(inputElement => { // Данное решение не является оптимальным, т.к. скорее всего можно было как то настроить метод в классе валидатора, но тогда в функцию closepopup нужно добавлять переменные и я не придумал как сделать это наиболее правильно
    inputElement.value = '';
  })
}

 function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keyup", handleEscape);
    document.removeEventListener("click", handleCloseByClick);
    clearInputForm();
  };


function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
    
  }
}

function handleCloseByClick(evt){
   
  if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-img')))
  {
    closePopup(document.querySelector('.popup_opened'));

    }
  }

function handleCardFormSubmit(evt) {
  const cardData = {
    name: all.inputAddPlaceName.value,
    link: all.inputAddPlaceLink.value
  }
  
  all.addCardFormValidator.disableSubmitButton();
  renderCard(createCard(cardData, all.cardSetting));
  closePopup(all.popupPlaceElement);
  evt.target.reset();
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

  openPopup(all.popupProfileEditElement, all.profileFormValidator);
  all.profileFormValidator.checkInputValidity();
}



all.profileEditOpenElement.addEventListener('click', openProfileEditPopup);

all.profileAddPlaceElement.addEventListener('click', () => {
  openPopup(all.popupPlaceElement, all.addCardFormValidator);

});

all.formProfilePopup.addEventListener('submit', handleProfileFormSubmit);
all.formPlacePopup.addEventListener('submit', handleCardFormSubmit);

addDefaultCards(all.massiveElementsPlaces);

export { openPopup }
