// Импорт стилей
import '../styles/pages/index.css';

// Импорт картинок
import logo from '../styles/images/logo.svg';

// Импорт модулей
import { createPlaceCard, deletePlaceCard, likeButton } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { profileFormSubmit } from './components/profileform.js';
import { placeFormSubmit } from './components/placeform.js';
import { setFormValues } from './components/form.js';
import { clearValidation, enableValidation } from './validation.js';
import { cardPost, getInitialCards, getUser, patchAvatar, profilePatch } from './api.js';
import { avatarFormSubmit } from './components/avatarform.js';

// Вставка статичных картинок в шаблон 
document.querySelector('.logo').src = logo;

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');
const avatarModal = document.querySelector('.popup_type_avatar-update');
const deleteModal = document.querySelector('.popup_type_delete-confirm');

const profileTitle = content.querySelector('.profile__title');
const profileDesc = content.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Картинка и подпись в попапе
const popupTitle = document.querySelector('.popup__caption');
const popupImage = document.querySelector('.popup__image');

// Формы
const profileForm = document.forms['edit-profile'];
const placeForm = document.forms['new-place'];
const avatarForm = document.forms['avatar-update'];
const deleteForm = document.forms['delete-confirm'];

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

const updateUser = (user) => {
  profileTitle.textContent = user.name;
  profileDesc.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;
}

// Текущий пользователь
let currentUser;
let currentAvatarUrl = '';

// Вывод карточек на страницу
Promise.all([getInitialCards(), getUser()])
  .then(([cards, user]) => {
    currentUser = user;
    cards.forEach((card) => {
      const placeCard = createPlaceCard(card, currentUser._id, handleDeleteClick, likeButton, handleImageClick);
      placesList.append(placeCard);
    });
    updateUser(currentUser);
    currentAvatarUrl = user.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

function changeSubmitButton(form, text) {
  const button = form.querySelector('.popup__button');
  button.textContent = text;
}

// Обработчики вызова модалок
content.addEventListener('click', function(evt) {
  const target = evt.target.closest('button');
  if (!target) return;
  const targetClass = target.classList;
  switch(true) {
    case targetClass.contains('profile__edit-button'):
      setFormValues(profileForm, {
        name: profileTitle.textContent,
        description: profileDesc.textContent,
      }); // Сброс формы профиля
      clearValidation(profileForm, validationConfig);
      changeSubmitButton(profileForm, 'Сохранить');
      openModal(editModal);
      break;
    case targetClass.contains('profile__add-button'): 
      placeForm.reset();
      openModal(newCardModal);
      changeSubmitButton(placeForm, 'Сохранить');
      clearValidation(placeForm, validationConfig);
      break;
    case targetClass.contains('profile__image'):
      setFormValues(avatarForm, {
        link: currentAvatarUrl
      })
      changeSubmitButton(avatarForm, 'Сохранить');
      openModal(avatarModal);
      clearValidation(avatarForm, validationConfig);
      break;
  }
  });
// Обработчик вызова модалки подтверждения удаления карточки
let cardIdToDelete;
let cardElementToDelete;
function handleDeleteClick(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;
  openModal(deleteModal);
}

// Обработчики форм
profileForm.addEventListener('submit', (evt) => {
  changeSubmitButton(profileForm, 'Сохранение...');
  profilePatch(profileFormSubmit(evt))
    .then((result) => {
      updateUser(result);
      closeModal(editModal);
    })
    .catch((err) => {
      console.log(err);
    });
});

placeForm.addEventListener('submit', (evt) => {
  changeSubmitButton(placeForm, 'Сохранение...');
  cardPost(placeFormSubmit(evt))
    .then((cardData) => {
      const newCard = createPlaceCard(cardData, currentUser._id, handleDeleteClick, likeButton, handleImageClick);
      placesList.prepend(newCard);
      closeModal(newCardModal);
    })
    .catch((err) => {
      changeSubmitButton(profileForm, 'Сохранить');
      console.log(err);
    });
});

avatarForm.addEventListener('submit', (evt) => {
  changeSubmitButton(avatarForm, 'Сохранение...');
  patchAvatar(avatarFormSubmit(evt))
    .then((user) => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;
      currentAvatarUrl = user.avatar; 
      closeModal(avatarModal);
    })
    .catch((err) => {
      changeSubmitButton(profileForm, 'Сохранить');
      console.log(err);
    });
});

deleteForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  deletePlaceCard(cardIdToDelete, cardElementToDelete)
    .then(() => {
      closeModal(deleteModal);
    })
    .catch((err) => {
      changeSubmitButton(profileForm, 'Сохранить');
      console.log(err);
    });
});

