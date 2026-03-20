export function resetForm(form, values = {}) {
  Object.keys(values).forEach((key) => {
    if (form.elements[key]) {
      form.elements[key].value = values[key];
    }
  });
}