export class FormValidator {
	constructor(validationConfig, formElement, submitButtonSelector) {
		this._formSelector = validationConfig.formSelector;
		this._inputSelector = validationConfig.inputSelecto
		this._submitButtonSelector = submitButtonSelector;
		this._inactiveButtonClass = validationConfig.inactiveButtonClass;
		this._inputErrorClass = validationConfig.inputErrorClass;
		this._errorClass = validationConfig.errorClass;
		this._inputList = Array.from(formElement);
	}

	// Найдет и переберет все формы на странице
	enableValidation() {
		this._setEventListeners();
	};

	buttonDisabled() {
		this._submitButtonSelector.setAttribute("disabled", "disabled");
		this._submitButtonSelector.classList.add(this._inactiveButtonClass);
	}

	// Примет параметры элемент формы и добавит полям нужные обработчики (слушатель событий)
	_setEventListeners() {

		// Нашли все поля внутри формы. Сделаем из них массив
		this._inputList.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement, this._inputErrorClass, this._errorClass);
				this._toggleButtonState();
			});
		});
	};

	// Показывает элемент ошибки
	_showInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
		inputElement.classList.add(inputErrorClass);
		errorElement.textContent = inputElement.validationMessage;
		errorElement.classList.add(errorClass);
	};

	// Скрывает элемент ошибки
	_hideInputError(inputElement, errorElement, inputErrorClass, errorClass) {
		inputElement.classList.remove(inputErrorClass);
		errorElement.classList.remove(errorClass);
		errorElement.textContent = '';
	};

	//Функция проверяет валидность поля
	_checkInputValidity(inputElement, inputErrorClass, errorClass) {
		const errorElement = inputElement.nextElementSibling;
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, errorElement, inputErrorClass, errorClass);
		} else {
			this._hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
		}
	};

	// Проверяет валидность полей и возвращает true Или false. На основе hasInvalidInput кнопка toggleButtonState меняет свое состояние
	_hasInvalidInput(inputList) {
		// проходим по этому массиву методом some
		return inputList.some((inputElement) => {
			// Если поле не валидно, колбэк вернёт true
			// Обход массива прекратится и вся фунцкция
			// hasInvalidInput вернёт true
			return !inputElement.validity.valid;
		})
	};

	// Включение кнопки submit и переключение ее состояния
	_toggleButtonState() {
		if (this._hasInvalidInput(this._inputList)) {
			this.buttonDisabled();
		} else {
			this._submitButtonSelector.removeAttribute('disabled');
			this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
		}
	}
};