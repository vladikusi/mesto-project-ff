  // Функция обработчика клика
  function handleClick(evt) {
  const targetClasses = evt.target.classList;
    if (targetClasses.contains('popup__close') || targetClasses.contains('popup'))
    {
      closeModal(evt.currentTarget);
    }
  }
  // Функция обработчика Escape
  function handleEsc(evt) {
    if (evt.key === 'Escape') {
      const openedModal = document.querySelector('.popup_is-opened');
      if (openedModal) {
        closeModal(openedModal);
      }
    }
  }

// Функция открытия модалки
export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  modal.addEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEsc);
  document.addEventListener('keydown', handleEsc);
}

// Функция закрытия модалки
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');  
  modal.removeEventListener('click', handleClick);
  document.removeEventListener('keydown', handleEsc);
}