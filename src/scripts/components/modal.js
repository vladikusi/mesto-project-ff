export function openModal(modal, onClose) {
  modal.classList.add('popup_is-opened');
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener('click', () => onClose(modal));
  
}

// Функция удаления карточки
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened'); 
}