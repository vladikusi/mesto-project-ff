// Сабмит формы
export function placeFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;

  const placeName = form.elements['place-name'].value;
  const placeLink = form.elements.link.value;

  return {name: placeName, link: placeLink};
}