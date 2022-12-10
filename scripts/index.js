const popupElement = document.querySelectorAll('.popup');//Массив наших попапов
const popupProfileEditElement = document.getElementById('popup_profile');//Редактор имени
const popupPlaceElement = document.getElementById('popup_place');// Добавление Места
const popupImageMax = document.getElementById('popup_ImageMax');//Картинка



const popupCloseElementProfile = popupProfileEditElement.querySelector('.popup__close-icon');//кнопки Закрытия
const popupCloseElementPlace = popupPlaceElement.querySelector(".popup__close-icon");
const popupCloseElementImage = popupImageMax.querySelector(".popup__close-icon");


const profileEditOpenElement = document.querySelector('.profile__edit-button');//Кнопки открытия
const profileAddPlaceElement = document.querySelector('.profile__add-button');


const popupSubmitElement = popupProfileEditElement.querySelector('.form__submit');//кнопка сохранения имени профиля
const popupAddPlaceElement = popupPlaceElement.querySelector('.form__submit');
//const likeElement = document.querySelector('.elements__like');


const formProfilePopup = popupProfileEditElement.querySelector('.form');//Формочки
const formPlacePopup = popupPlaceElement.querySelector('.form');


const profileName = document.querySelector('.profile__name'); //Имя 
const profileStatus = document.querySelector('.profile__status');// Статус

const inputProfileName = popupProfileEditElement.querySelector('.form__input_type_name');
const inputProfileStatus = popupProfileEditElement.querySelector('.form__input_type_status');

const inputAddPlaceName = popupPlaceElement.querySelector('.form__input_type_Name-Place');
const inputAddPlaceLink = popupPlaceElement.querySelector('.form__input_type_Link-Place');

const ImgMax = popupImageMax.querySelector(".ImgMax-container__Img");//Фотка в разрешении
const ImgMaxTitle = popupImageMax.querySelector(".ImgMax-container__caption");

const ElementTemplate = document.querySelector(".template").content;//карточки
const ElementsList = document.querySelector(".elements__cards");//Список карточкек

const MassiveElementsPlaces = [
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
      name: "Xmas",
      link: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      name: "another one xmas",
      link: "https://images.unsplash.com/photo-1577309159021-f7c7d66e02c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },

 ];

const openPopup = function (popup) {popup.classList.add('popup_opened');}//общая функция открытия попапа

const closePopup = function (popup) {popup.classList.remove('popup_opened');}//Закрывашки

popupCloseElementProfile.addEventListener('click', () =>{closePopup(popupProfileEditElement)});//Можно сделать какой то массив,пока не знаю как
popupCloseElementPlace.addEventListener('click', () =>{closePopup(popupPlaceElement)});
popupCloseElementImage.addEventListener('click', () =>{closePopup(popupImageMax)});


 function openEditProfile() {//Присвоение значений и открытие попапа профиля
   openPopup(popupProfileEditElement);
   inputProfileName.value = profileName.textContent;
   inputProfileStatus.value = profileStatus.textContent;
 }

 function openPlaceElement() {
   formPlacePopup.reset();
   openPopup(popupPlaceElement);
}

const renameingProfileandStatus = function (event) {//Функция присвоения значений из попапа в профиль
   event.preventDefault();
   profileName.textContent = inputProfileName.value;
   profileStatus.textContent = inputProfileStatus.value;
   closePopup(popupProfileEditElement);
}



profileEditOpenElement.addEventListener('click', openEditProfile);
formProfilePopup.addEventListener('submit', renameingProfileandStatus);


const creatElementPlace = function(value){ //make карточки
   const elementsItem = ElementTemplate.querySelector(".elements__item").cloneNode(true);
   const ElementsItemImg = elementsItem.querySelector(".elements__image");
   elementsItem.querySelector(".elements__caption").textContent = value.name;
   ElementsItemImg.setAttribute("src", value.link);
   ElementsItemImg.setAttribute("alt", value.name);

    elementsItem.querySelector(".elements__trash").addEventListener("click", (event) =>{
      event.target.closest(".elements__item").remove()
   }
    );
    ElementsItemImg.addEventListener("click", () => {
    openPopup(popupImageMax);
    ImgMax.setAttribute("src", ElementsItemImg.getAttribute("src"));
    ImgMax.setAttribute("alt", value.name);
    ImgMaxTitle.textContent = value.name;
  }
  );

  return elementsItem;
}

const renderPlaceElement = (value, elements = ElementsList) => { //Создаем карточки по функции выше
   elements.prepend(creatElementPlace(value));
 };
 
 MassiveElementsPlaces.forEach((element) => renderPlaceElement(element));


 function submitAddPlaceElementForm(event) {
   event.preventDefault();
   renderPlaceElement({
     name: inputAddPlaceName.value,
     link: inputAddPlaceLink.value,
   });
   closePopup(popupPlaceElement);
 }
 profileAddPlaceElement.addEventListener('click', openPlaceElement);
 popupAddPlaceElement.addEventListener('click', submitAddPlaceElementForm);