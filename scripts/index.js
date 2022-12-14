// import {massiveElementsPlaces} from "./consts";
// import { enableValidation } from "./Validation";
// import { makeButtonStateDisabled } from "./Validation";
// import { config } from "./Validation";

const popupElements = document.querySelectorAll(".popup"); //Массив наших попапов

const popupProfileEditElement = document.querySelector(".popup_profile"); //Редактор имени
const popupPlaceElement = document.querySelector(".popup_place"); // Добавление Места
const popupImageMax = document.querySelector(".popup_type_ImageMax"); //Картинка

const profileEditOpenElement = document.querySelector(".profile__edit-button"); //Кнопки открытия
const profileAddPlaceElement = document.querySelector(".profile__add-button");

//Две разные кнопки из разных попапов
const popupSubmitElement =
  popupProfileEditElement.querySelector(".form__submit"); //кнопка сохранения имени профиля
const popupAddPlaceElement = popupPlaceElement.querySelector(".form__submit"); // кнопка сохранения в добавлении карточек

const formProfilePopup = popupProfileEditElement.querySelector(".form"); //Формочки
const formPlacePopup = popupPlaceElement.querySelector(".form");

const profileName = document.querySelector(".profile__name"); //Имя
const profileStatus = document.querySelector(".profile__status"); // Статус

const inputProfileName = popupProfileEditElement.querySelector(
  ".form__input_type_name"
);
const inputProfileStatus = popupProfileEditElement.querySelector(
  ".form__input_type_status"
);

const inputAddPlaceName = popupPlaceElement.querySelector(
  ".form__input_type_Name-Place"
);
const inputAddPlaceLink = popupPlaceElement.querySelector(
  ".form__input_type_Link-Place"
);

const imgMax = popupImageMax.querySelector(".ImgMax-container__Img"); //Фотка в разрешении
const imgMaxTitle = popupImageMax.querySelector(".ImgMax-container__caption");

const elementTemplate = document.querySelector(".template").content; //карточки
const elementsContainer = document.querySelector(".elements__cards"); //Список карточкек

const massiveElementsPlaces = [
  {
    name: "and another one",
    link: "https://images.unsplash.com/photo-1509042283213-f7167abd77f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    name: "and another one",
    link: "https://images-ext-1.discordapp.net/external/ejX3UreZq40TrHXWSGkylFxaEtoqbYi5BY-Iszo_GGU/https/placepic.ru/wp-content/uploads/2018/12/Holidays_Christmas_402342.jpg?width=665&height=449",
  },
  {
    name: "and another one",
    link: "https://images-ext-1.discordapp.net/external/QdlMl3eCE1Vfn5hA9UwD7SQBCQ_DDfbjkQFEYEjiJ50/https/ptoday.ru/wp-content/uploads/2020/12/163bd4a37fbf445.jpg?width=705&height=441",
  },
  {
    name: "and another one",
    link: "https://images-ext-2.discordapp.net/external/9oNCJewC3bJinc79YVkhu1LC-XyX2gqiV6ZCXYexFYs/http/almode.ru/uploads/posts/2021-12/1639080692_8-almode-ru-p-novogodnie-shariki-na-zastavku-8.jpg?width=705&height=441",
  },

  {
    name: "another one xmas",
    link: "https://images.unsplash.com/photo-1577309159021-f7c7d66e02c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    name: "Xmas",
    link: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
];

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleKeyUpEscape);
}; //общая функция открытия попапа

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleKeyUpEscape);
}; //Закрывашки

const handleCloseByClick = (evt) => {
  //оверлейчик
  if (
    evt.target == evt.currentTarget ||
    evt.target.classList.contains("popup__close-img")
  ) {
    closePopup(evt.currentTarget);
  }
};

const handleKeyUpEscape = (evt) => {
  //Закрытие попапа нажатием на Esc
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

popupProfileEditElement.addEventListener("click", handleCloseByClick);
popupPlaceElement.addEventListener("click", handleCloseByClick);
popupImageMax.addEventListener("click", handleCloseByClick);

function openEditProfile() {
  //Присвоение значений и открытие попапа профиля
  openPopup(popupProfileEditElement);
  inputProfileName.value = profileName.textContent;
  inputProfileStatus.value = profileStatus.textContent;
}

function openPlaceElement() {
  formPlacePopup.reset();
  openPopup(popupPlaceElement);
  makeButtonStateDisabled(popupAddPlaceElement, config);
}

const handleSubmitProfileForm = function (event) {
  //Функция присвоения значений из попапа в профиль
  event.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileStatus.textContent = inputProfileStatus.value;
  closePopup(popupProfileEditElement);
};

profileEditOpenElement.addEventListener("click", openEditProfile);
formProfilePopup.addEventListener("submit", handleSubmitProfileForm);

const createElementPlace = function (card) {
  //make карточки
  const cardsItem = elementTemplate
    .querySelector(".elements__item")
    .cloneNode(true);
  const cardsItemImg = cardsItem.querySelector(".elements__image");
  const likeElement = cardsItem.querySelector(".elements__like");
  cardsItem.querySelector(".elements__caption").textContent = card.name;
  cardsItemImg.setAttribute("src", card.link);
  cardsItemImg.setAttribute("alt", card.name);

  cardsItem
    .querySelector(".elements__trash")
    .addEventListener("click", (event) => {
      event.target.closest(".elements__item").remove();
    });
  likeElement.addEventListener("click", (event) => {
    event.target.classList.toggle("elements__like_active");
  });

  cardsItemImg.addEventListener("click", () => {
    openPopup(popupImageMax);
    imgMax.setAttribute("src", cardsItemImg.getAttribute("src"));
    imgMax.setAttribute("alt", card.name);
    imgMaxTitle.textContent = card.name;
  });

  return cardsItem;
};

const renderPlaceElement = (value, elements = elementsContainer) => {
  //Создаем карточки по функции выше
  elements.prepend(createElementPlace(value));
};

massiveElementsPlaces.forEach((element) => renderPlaceElement(element));

function submitAddPlaceElementForm(event) {
  event.preventDefault();
  renderPlaceElement({
    name: inputAddPlaceName.value,
    link: inputAddPlaceLink.value,
  });
  closePopup(popupPlaceElement);
}
profileAddPlaceElement.addEventListener("click", openPlaceElement);
formPlacePopup.addEventListener("submit", submitAddPlaceElementForm);
