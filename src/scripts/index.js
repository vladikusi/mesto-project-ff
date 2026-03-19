import '../styles/pages/index.css'; //Импорт стилей

// Импорт картинок
import logo from '../styles/images/logo.svg';
import avatar from '../styles/images/avatar.jpg';

// Импорт модулей
import initialCards from './initcards.js';
import { createPlaceCard, deletePlaceCard } from './components/card.js';

// Вставка картинок в шаблон 
document.querySelector('.logo').src = logo;
document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;

// Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');


// Вывод карточек на страницу
initialCards.forEach((card) => {
  const placeCard = createPlaceCard(card, deletePlaceCard, placeCardTemplate);
  placesList.append(placeCard);
});

