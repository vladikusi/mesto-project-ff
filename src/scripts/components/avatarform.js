export function avatarFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;

  return form.elements.link.value; 
}