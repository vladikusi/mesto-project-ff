// Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// Функция создания карточки
function createPlaceCard (cardData, onDelete) {
  const placeCardElement = placeCardTemplate.querySelector('.places__item').cloneNode(true);
  const title = placeCardElement.querySelector('.card__title');
  const image = placeCardElement.querySelector('.card__image');
  const deleteButton = placeCardElement.querySelector('.card__delete-button');

  title.textContent = cardData.name;
  image.src = cardData.link;
  deleteButton.addEventListener('click', onDelete);
  
  return placeCardElement;
}

// Функция удаления карточки
function deletePlaceCard(evt) {
  const placeCard = evt.target.closest('.places__item');
  placeCard.remove(); 
}

// Вывод карточек на страницу
initialCards.forEach((card) => {
  const placeCard = createPlaceCard(card, deletePlaceCard);
  placesList.append(placeCard);
})

