// Сабмит формы
export function profileFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;

  const user = {
    name: form.elements.name.value,
    about: form.elements.description.value
  }
  return user;
}

