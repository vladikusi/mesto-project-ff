// Сабмит формы
export function placeFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;

  const cardData = {
    name: form.elements['place-name'].value,
    link: form.elements.link.value,
  };

  return cardData;
}
