'use strict';
import FormValidator from './FormValidator.js';

export const massiveElementsPlaces = [
  {
    name: "created by Midjourney",
    link: "https://media.discordapp.net/attachments/1070346803221889055/1070346804765409340/SPOILER_Cacoethes_a_cat_floating_from_balloons_in_a_store_with_weird_mo_21aae443-e0c2-4e13-bcc7-ef7f88e1aa5f.png?width=506&height=506",
  },
  {
    name: "created by Midjourney",
    link: "https://media.discordapp.net/attachments/1038329663187062804/1073149113266352198/Bluewing_Old_chinese_paint_b5ea34ef-e758-4364-bcc7-850bef47d4ff.png?width=289&height=506",
  },
  {
    name: "created by Midjourney",
    link: "https://media.discordapp.net/attachments/1038329663187062804/1072101657120346122/MrNoMbre_landscape_of_Alaska_55f0591e-ab5f-475f-8492-a61782128e83.png?width=759&height=506",
  },
  {
    name: "created by Midjourney",
    link: "https://cdn.discordapp.com/attachments/1038329663187062804/1069076684428554240/treehouse_5.jpeg",
  },

  {
    name: "created by Midjourney",
    link: "https://sun1-99.userapi.com/impg/n2RgVCbazkukTQbdjA4j_CH473OkE46bVopGlw/v-6kzK128H0.jpg?size=960x1664&quality=96&sign=737cf3768990fe65ace6af947d91a28b&type=album",
  },
  {
    name: "created by Midjourney",
    link: "https://sun1-85.userapi.com/impg/2a-oDADp1is5zHhd8W5KQHWS1y6RekYyeTweUA/se7LOizvi0k.jpg?size=1024x1024&quality=96&sign=b1d4d6b31645c9dd8819bbf9ab3079dc&type=album",
  },

];

export const formSetting = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  disabledSubmitButton: "form__submit_disabled",//
  inputErrorSelector: "form__input_type-error",//
  errorClass: "form__error_visible",
};



export const  popupElements = document.querySelectorAll(".popup"),
              popupProfileEditElement = document.querySelector(".popup_profile"), //Редактор имени
              popupPlaceElement = document.querySelector(".popup_place"), // Добавление Места
              profileEditOpenElement = document.querySelector(".profile__edit-button"), //Кнопки открытия
              popupSubmitElement = popupProfileEditElement.querySelector(".form__submit"), //кнопка сохранения имени профиля
                formProfilePopup = popupProfileEditElement.querySelector(".form"), //форма профиля
                formPlacePopup = popupPlaceElement.querySelector(".form"),//форма добавления места
              profileName = document.querySelector(".profile__name"), //Имя
              profileStatus = document.querySelector(".profile__status"), // Статус
              inputProfileName = popupProfileEditElement.querySelector(".form__input_type_name"),
              inputProfileStatus = popupProfileEditElement.querySelector(".form__input_type_status"),
              popupImageMax = document.querySelector(".popup_type_ImageMax"), //Картинка
              profileAddPlaceElement = document.querySelector(".profile__add-button"),
              popupAddPlaceElement = popupPlaceElement.querySelector(".form__submit"),// кнопка сохранения в добавлении карточек
              inputAddPlaceName = popupPlaceElement.querySelector(".form__input_type_Name-Place"),
              inputAddPlaceLink = popupPlaceElement.querySelector(".form__input_type_Link-Place"),
              cardsContainer = document.querySelector('.elements__cards'),
                profileFormValidator = new FormValidator(formSetting, formProfilePopup),
                addCardFormValidator = new FormValidator(formSetting, formPlacePopup);



              export
              const cardSetting = {
                cardTemplate: '.template',
                cardSelector: '.elements__item',
                cardDeleteBtnSelector: '.elements__trash',
                cardImgSelector: '.elements__image',
                cardTitleSelector: '.elements__caption',
                cardLikeBtnSelector: '.elements__like',
                activeLikeBtnClass: 'elements__like_active'
              };
