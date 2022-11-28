const popupElement = document.querySelector('.popup');
const popupCloseElement = popupElement.querySelector('.popup__close-icon');
const popupOpenElement = document.querySelector('.profile__edit-button');
const popupSubmitElement = popupElement.querySelector('.popup__submit');
//const likeElement = document.querySelector('.elements__like');
const formPopup = document.querySelector('.form');

let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');

let inputProfileName = popupElement.querySelector('.form__input_type_name');
let inputProfileStatus = popupElement.querySelector('.form__input_type_status');

//const toggleLikeElement = function(){
//   likeElement.classList.toggle('elements__like_active')
//}
//const deactivateLikeElement = function(){
//   likeElement.classList.remove('elements__like_active')
//}

const openPopup = function () {
   popupElement.classList.add('popup_opened');
   inputProfileName.value = profileName.textContent
   inputProfileStatus.value = profileStatus.textContent
}

const closePopup = function () {
   popupElement.classList.remove('popup_opened');
}

const renameingProfileandStatus = function (event) {

   profileName.textContent = inputProfileName.value;
   profileStatus.textContent = inputProfileStatus.value;
   closePopup();
   event.preventDefault();
}
popupOpenElement.addEventListener('click', openPopup);
popupCloseElement.addEventListener('click', closePopup);
//likeElement.addEventListener('click', toggleLikeElement);// Прочитал в слаке что это норма, что лайк нельзя поставить сразу на все картинки,но переменная связывается только с 1 элементом
formPopup.addEventListener('submit', renameingProfileandStatus);