// Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createPlaceCard (cardData, onDelete, onLike, onImage) {
  const placeCardElement = placeCardTemplate.querySelector('.places__item').cloneNode(true);
  const title = placeCardElement.querySelector('.card__title');
  const image = placeCardElement.querySelector('.card__image');
  const deleteButton = placeCardElement.querySelector('.card__delete-button');
  const like = placeCardElement.querySelector('.card__like-button');

  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
  deleteButton.addEventListener('click', () => onDelete(placeCardElement));
  
  like.addEventListener('click', () => onLike(like));

  image.addEventListener('click', () => onImage(title, image))

  return placeCardElement;
}

// Функция удаления карточки
export function deletePlaceCard(cardElement) {
  cardElement.remove(); 
}

// Функция лайка карточки
export function likeButton(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}
