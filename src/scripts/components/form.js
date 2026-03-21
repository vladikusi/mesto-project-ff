export function setFormValues(form, values = {}) {
  Object.keys(values).forEach((key) => {
    if (form.elements[key]) {
      form.elements[key].value = values[key];
    }
  });
}