import './index.css';
import {massiveElementsPlaces, formSetting, profileEditOpenElement, profileAddPlaceOpenElement, cardSelectors, userInfoSelectors} from '../consts/consts.js';
import { Card } from '../scripts/Cards.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { Section } from '../scripts/Section.js';
import { UserInfo } from '../scripts/UserInfo.js';
import { PopupWithImage } from '../scripts/Popup/PopupWithImage/PopupWithImage.js';
import { PopupWithForm } from '../scripts/Popup/PopupWithForm/PopupWithForm.js';


const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.userNameSelector,
  dataSelector: userInfoSelectors.userDataSelector,
}); 

function createCard(cardData){
  console.log(cardData);
  return new Card({ 
      cardData, 
      handleCardClick: () => {
          popupImage.showPopupImgCard(cardData);
      } 
  }, '.template').getCard();
};

const cardsSection = new Section(
  {
      renderer: (item) => {
          cardsSection.addItem(createCard(item));
      }
  },
  cardSelectors.containerSelector
);


const userInfoPopup = new PopupWithForm({ popupSelector: '.popup_profile', submitFunction: (data) => {
  userInfo.setUserInfo(data);
  userInfoPopup.closePopup();
}
});

const popupImage = new PopupWithImage('.popup_type_ImageMax');

const newCardPopup = new PopupWithForm({ popupSelector: '.popup_place', submitFunction: (data) => {
  cardsSection.addItem(createCard({
      name: data['new_place'],
      link: data['place_link']
  }, cardSelectors.cardSelectors));
  newCardPopup.closePopup();
} 
});

cardsSection.renderItems(massiveElementsPlaces);
popupImage.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formSetting);



profileEditOpenElement.addEventListener('click', function () {
    formValidators['profileForm'].disableSubmitButton();
    const myUserInfo = userInfo.getUserInfo();
    userInfoPopup.setInputValues({
        userName: myUserInfo.userName,
        userStatus: myUserInfo.userStatus
    });
    userInfoPopup.openPopup();
}); 

profileAddPlaceOpenElement.addEventListener('click', function () {
    formValidators['placeForm'].disableSubmitButton();
    newCardPopup.openPopup();
});