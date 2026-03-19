// Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createPlaceCard (cardData, onDelete) {
  const placeCardElement = placeCardTemplate.querySelector('.places__item').cloneNode(true);
  const title = placeCardElement.querySelector('.card__title');
  const image = placeCardElement.querySelector('.card__image');
  const deleteButton = placeCardElement.querySelector('.card__delete-button');

  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
  deleteButton.addEventListener('click', () => onDelete(placeCardElement));
  
  return placeCardElement;
}

// Функция удаления карточки
export function deletePlaceCard(cardElement) {
  cardElement.remove(); 
}