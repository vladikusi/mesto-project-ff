// Импорт стилей
import '../styles/pages/index.css';

// Импорт картинок
import logo from '../styles/images/logo.svg';
import avatar from '../styles/images/avatar.jpg';

// Импорт модулей
import initialCards from './initcards.js';
import { createPlaceCard, deletePlaceCard, likeButton } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { profileFormSubmit } from './components/profileform.js';
import { placeFormSubmit } from './components/placeform.js';
import { setFormValues } from './components/form.js';
import { clearValidation, enableValidation } from './validation.js';

// Вставка статичных картинок в шаблон 
document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;


// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

const profileTitle = content.querySelector('.profile__title');
const profileDesc = content.querySelector('.profile__description');

// Картинка и подпись в попапе
const popupTitle = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

// Формы
const profileForm = document.forms['edit-profile'];
const placeForm = document.forms['new-place'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig); 

// Обработчик нажатия на картинку
const handleImageClick = (name, link) => {
  popupTitle.textContent = name;
  popupImage.src = link;
  popupImage.alt = name;

  openModal(imageModal);
}

// Вывод карточек на страницу
initialCards.forEach((card) => {
  const placeCard = createPlaceCard(card, deletePlaceCard, likeButton, handleImageClick);
  placesList.append(placeCard);
});

// Обработчики вызова модалок
content.addEventListener('click', function(evt) {
  const targetClass = evt.target.classList;
  if (targetClass.contains('profile__edit-button')) {
    setFormValues(profileForm, {
      name: profileTitle.textContent,
      description: profileDesc.textContent,
    }); // Сброс формы профиля
    clearValidation(profileForm, validationConfig);
    openModal(editModal);
  } else if (targetClass.contains('profile__add-button')) {
    placeForm.reset();
    openModal(newCardModal);
    clearValidation(placeForm, validationConfig);
  }
});

// Обработчики форм
profileForm.addEventListener('submit', (evt) => {
  profileFormSubmit(evt, profileTitle, profileDesc);
  closeModal(editModal);
});

placeForm.addEventListener('submit', (evt) => {
  const newCardData = placeFormSubmit(evt);
  const newCard = createPlaceCard(newCardData, deletePlaceCard, likeButton, handleImageClick);
  placesList.prepend(newCard);
  closeModal(newCardModal);
});