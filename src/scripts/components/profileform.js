// Сабмит формы
export function profileFormSubmit(evt, profileName, profileDesc) {
  evt.preventDefault();

  const form = evt.target;

  profileName.textContent = form.elements.name.value;
  profileDesc.textContent = form.elements.description.value;
}