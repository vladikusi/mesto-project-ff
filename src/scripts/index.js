// Импорт стилей
import '../styles/pages/index.css';

// Импорт картинок
import logo from '../styles/images/logo.svg';
import avatar from '../styles/images/avatar.jpg';

// Импорт модулей
import initialCards from './initcards.js';
import { createPlaceCard, deletePlaceCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

// Вставка статичных картинок в шаблон 
document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;


// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const editModal = document.querySelector('.popup_type_edit');
const newCardModal = document.querySelector('.popup_type_new-card');
const imageModal = document.querySelector('.popup_type_image');

// Вывод карточек на страницу
initialCards.forEach((card) => {
  const placeCard = createPlaceCard(card, deletePlaceCard);
  placesList.append(placeCard);
});

content.addEventListener('click', function(evt) {
  const targetClass = evt.target.classList;
  if (targetClass.contains('profile__edit-button')) {
    openModal(editModal, closeModal);
  }
  if (targetClass.contains('profile__add-button')) {
    openModal(newCardModal, closeModal);
  }
  if (targetClass.contains('card__image')) {
    openModal(imageModal, closeModal);
  }

});
