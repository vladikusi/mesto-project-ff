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

const checkImageUrl = (input) => {
  return fetch(input.value, {
    method: 'HEAD',
  })
    .then((response) => {
      const contentType = response.headers.get('Content-Type');
      if (!response.ok || !contentType?.startsWith('image/')) {
        input.setCustomValidity('Ссылка должна вести на изображение');
      } else {
        input.setCustomValidity('');
      }
    })
    .catch((err) => {
      input.setCustomValidity('Не удалось проверить ссылку');
      console.log(err);
    });
};

async function checkInputValidity(form, input, validationSettings) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else if (input.type === 'url') {
    await checkImageUrl(input);
  } else {
    input.setCustomValidity('');
  }
  if (!input.validity.valid) {
    showInputError(
      input,
      validationSettings.inputErrorClass,
      validationSettings.errorClass,
    );
  } else {
    hideInputError(
      input,
      validationSettings.inputErrorClass,
      validationSettings.errorClass,
    );
  }
}

function hasInvalidInput(inputList) {
  return [...inputList].some((input) => !input.validity.valid);
}

function toggleButtonState(
  inputList,
  button,
  inactiveButtonClass,
  isChecking = false,
) {
  if (isChecking || hasInvalidInput(inputList)) {
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
    let timeout;

    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        toggleButtonState(
          inputs,
          button,
          validationConfig.inactiveButtonClass,
          true,
        );

        timeout = setTimeout(async () => {
          await checkInputValidity(form, input, validationConfig);
          toggleButtonState(
            inputs,
            button,
            validationConfig.inactiveButtonClass,
          );
        }, 500);
      });
    });
  });
}

export function clearValidation(form, validationSettings) {
  const inputs = form.querySelectorAll(validationSettings.inputSelector);

  const button = form.querySelector(validationSettings.submitButtonSelector);

  inputs.forEach((input) => {
    hideInputError(
      input,
      validationSettings.inputErrorClass,
      validationSettings.errorClass,
    );
    input.setCustomValidity('');
  });

  button.classList.add(validationSettings.inactiveButtonClass);
  button.disabled = true;
}
