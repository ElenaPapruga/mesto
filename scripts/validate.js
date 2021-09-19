// Показывает элемент ошибки
const showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);

};

// Скрывает элемент ошибки
const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//Функция проверяет валидность поля
const checkInputValidity = (inputElement, inputErrorClass, errorClass) => {
  const errorElement = inputElement.nextElementSibling;
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

// Проверяет валидность полей и возвращает true Или false. На основе hasInvalidInput кнопка toggleButtonState меняет свое состояние
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  })
};

//Проверка на пустые поля
const hasNotInvalidInput = (inputList) => {
  return inputList.every((inputElement) => {
    return inputElement.value.legth === 0;
  });
};

// Выключение кнопки
const disableSubmitButton = (buttonElement, inactiveButtonClass, inactive) => {
  if (inactive) {
    buttonElement.setAttribute("disabled", "disabled");
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

// Включение кнопки submit и переключение ее состояния
const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
  const inactive = true;
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, inactiveButtonClass, inactive);
  } else {
    disableSubmitButton(buttonElement, inactiveButtonClass, !inactive);
  }
}

// Примет параметры элемент формы и добавит полям нужные обработчики (слушатель событий)
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass) => {

  // Нашли все поля внутри формы. Сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
};

// Найдет и переберет все формы на странице
const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass, config.errorClass, config.inactiveButtonClass);
  });
};