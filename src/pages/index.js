import './index.css';
import { formSetting, profileEditOpenElement, profileAddPlaceOpenElement, cardSelectors, userInfoSelectors, profileAvatarOpenElement, popupSelectors } from '../consts/consts.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js'
import { Api } from '../components/Api.js'

let userId = null;
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
      authorization: 'fc8e0de8-3f5b-4c7c-b308-6ce4229f33e1',
      'Content-Type': 'application/json'
  }
});
const userInfo = new UserInfo({
  nameSelector: userInfoSelectors.userNameSelector,
  dataSelector: userInfoSelectors.userDataSelector,
  avatarSelector: userInfoSelectors.userAvatarSelector
}); 

const cardsSection = new Section(
  {
      renderer: (item) => {
          cardsSection.addItem(createCard(item));
      }
  },
  cardSelectors.containerSelector
);

const popupImage = new PopupWithImage(popupSelectors.popupImage);

const popupAvatar = new PopupWithForm({
  popupSelector: popupSelectors.popupAvatarEdit,
  submitFunction: (data) => {
      popupAvatar.stillWaiting(true);
      api.setAvatar(data.userAvatar)
      .then((data) => {
          userInfo.setUserInfo({
              userName: data.name,
              userData: data.about,
              userAvatar: data.avatar
          });
          popupAvatar.closePopup();
      })
      .catch(err => 
          console.log(`Ошибка изменения аватара пользователя: ${err}`))
          .finally(() => {
              popupAvatar.stillWaiting(false);
          })
  }, formSetting
});

const userInfoPopup = new PopupWithForm({ 
  popupSelector: popupSelectors.userInfoPopup, 
  submitFunction: (data) => {
      userInfoPopup.stillWaiting(true);
      api.setUserInfo({
          name: data.userName,
          about: data.userData
      })
      .then((data) => {
          userInfo.setUserInfo({
              userName: data.name,
              userData: data.about,
              userAvatar: data.avatar
          });
          userInfoPopup.closePopup();
      })
      .catch(err => 
          console.log(`Ошибка загрузки информации о пользователе: ${err}`))
          .finally(() => {
              userInfoPopup.stillWaiting(false);
          })
  }, formSetting
});

const newCardPopup = new PopupWithForm({ 
  popupSelector: popupSelectors.newCardPopup, 
  submitFunction: (data) => {
      newCardPopup.stillWaiting(true);
      api.postNewCard({
          name: data['new_place'],
          link: data['place_link']
      })
      .then((data) => {
          cardsSection.addItem(createCard(data));
          newCardPopup.closePopup();
      })
      .catch(err => 
          console.log(`Ошибка загрузки новой карточки: ${err}`))
          .finally(() => {
              newCardPopup.stillWaiting(false);
          })
}, formSetting
});

const popupDeleteNewCard = new PopupWithSubmit(popupSelectors.popupDeleteCard) 

popupImage.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
popupAvatar.setEventListeners();
popupDeleteNewCard.setEventListeners();

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

function createCard(cardData){
  return new Card({ 
      cardData, 
      handleCardClick: () => {
          popupImage.showPopupImgCard(cardData);
      },
      handleDeleteClick: (card) => {
          popupDeleteNewCard.openPopup();
          popupDeleteNewCard.setHandleDeleteClick(() => {
              api.deleteCard(card.getCardId())
              .then(() => {
                  card.deleteCard();
                  popupDeleteNewCard.closePopup();
              })
              .catch(err => 
                  console.log(`Ошибка удаления карточки: ${err}`))
          })
      },
      handleLikeClick: (card) => {
          api.getIsLiked(card.getCardId(), card.isLiked())
          .then(data => {
              card.addLike(data);
          })
          .catch(err => 
              console.log(`Ошибка статуса лайка: ${err}`))
      },
      userId
  }, '.template').getCard();
};

profileEditOpenElement.addEventListener('click', function () {
  formValidators['profileForm'].disableSubmitButton();
  const myUserInfo = userInfo.getUserInfo();
  userInfoPopup.setInputValues({
      userName: myUserInfo.userName,
      userData: myUserInfo.userData
  });
  userInfoPopup.openPopup();
}); 

profileAddPlaceOpenElement.addEventListener('click', function () {
  formValidators['placeForm'].disableSubmitButton();
  newCardPopup.openPopup();
});

profileAvatarOpenElement.addEventListener('click', function () {
  formValidators['userAvatar'].disableSubmitButton();
  popupAvatar.openPopup();
});

api.getAppData()
.then(([ userData, initialCards ]) => {
  userId = userData._id;
  userInfo.setUserInfo({
    userName: userData.name,
    userData: userData.about,
    userAvatar: userData.avatar
  });
  cardsSection.renderItems(initialCards.reverse());
})
.catch(err =>
  console.log(`Ошибка загрузки данных: ${err}`))