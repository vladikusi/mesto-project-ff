function showInputError(input, inputErrorClass, errorClass) {
  const errorElement = input.nextElementSibling;

  input.classList.add(inputErrorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(input, inputErrorClass, errorClass) {
  const errorElement = input.nextElementSibling;

  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(form, input, validationSettings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(input, validationSettings.inputErrorClass, validationSettings.errorClass);
  } else {
    hideInputError(input, validationSettings.inputErrorClass, validationSettings.errorClass);
  }
}


function hasInvalidInput(inputList) {
  return [...inputList].some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

export function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => {
    const inputs = form.querySelectorAll(validationConfig.inputSelector);
    const button = form.querySelector(validationConfig.submitButtonSelector);

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(form, input, validationConfig);
        toggleButtonState(inputs, button, validationConfig.inactiveButtonClass);
      });
    });
  });
}

export function clearValidation(form, validationSettings) {
  const inputs = form.querySelectorAll(validationSettings.inputSelector);
  
  const button = form.querySelector(validationSettings.submitButtonSelector);
  
  inputs.forEach((input) => {
    hideInputError(input, validationSettings.inputErrorClass, validationSettings.errorClass);
    input.setCustomValidity('');
  });

  button.classList.add(validationSettings.inactiveButtonClass);
  button.disabled = true;
}