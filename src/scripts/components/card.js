import { cardDelete, cardLike, cardUnlike } from "../api";

// Темплейт карточки
const placeCardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createPlaceCard (cardData, userId, onDelete, onLike, onImage) {
  const placeCardElement = placeCardTemplate.querySelector('.places__item').cloneNode(true);
  const title = placeCardElement.querySelector('.card__title');
  const image = placeCardElement.querySelector('.card__image');
  const deleteButton = placeCardElement.querySelector('.card__delete-button');
  const like = placeCardElement.querySelector('.card__like-button');
  const likeCount = placeCardElement.querySelector('.card__like-count');

  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;
  likeCount.textContent = cardData.likes.length;

  const isLiked = cardData.likes.some((like) => like._id === userId);

  if (isLiked) {
    like.classList.add('card__like-button_is-active');
  }
  
  if(userId !== cardData.owner._id) {
    deleteButton.classList.add('card__delete-button_hidden');
  }
  else {
    deleteButton.addEventListener('click', () => onDelete(cardData._id, placeCardElement));
  }
  like.addEventListener('click', () => onLike(cardData, userId, likeCount, like));

  image.addEventListener('click', () => onImage(cardData.name, cardData.link));

  return placeCardElement;
}

// Функция удаления карточки
export function deletePlaceCard(cardId, cardElement) {
  return cardDelete(cardId)
    .then(() => {
      cardElement.remove();
    });
}

// Функция лайка карточки
export function likeButton(cardData, userId, likeCount, likeElement) {
  const isLiked = cardData.likes.some((like) => like._id === userId);

  const likeRequest = isLiked
    ? cardUnlike(cardData._id)
    : cardLike(cardData._id);

  likeRequest
    .then((updatedCard) => {
      cardData.likes = updatedCard.likes;
      likeElement.classList.toggle('card__like-button_is-active');
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

