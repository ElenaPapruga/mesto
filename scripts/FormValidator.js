export class FormValidator {
	constructor(validationConfig) {
		this._validationConfig = validationConfig;
		this._formSelector = this._validationConfig.formSelector;
		this._inputSelector = this._validationConfig.inputSelector;
		this._submitButtonSelector = this._validationConfig.submitButtonSelector;
		this._inactiveButtonClass = this._validationConfig.inactiveButtonClass;
		this._inputErrorClass = this._validationConfig.inputErrorClass;
		this._errorClass = this._validationConfig.errorClass;
		this._enableValidation(this._validationConfig);
	}

	// Найдет и переберет все формы на странице
	_enableValidation(config){
		const formList = document.querySelectorAll(config.formSelector);
		formList.forEach((formElement) => {
			this._setEventListeners(formElement, config.inputSelector, config.submitButtonSelector, config.inputErrorClass, config.errorClass, config.inactiveButtonClass);
		});
	};
			
	// Примет параметры элемент формы и добавит полям нужные обработчики (слушатель событий)
	_setEventListeners(formElement, inputSelector, submitButtonSelector, inputErrorClass, errorClass, inactiveButtonClass){

	// Нашли все поля внутри формы. Сделаем из них массив
		const inputList = Array.from(formElement.querySelectorAll(inputSelector));
		inputList.forEach(inputElement => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement, this._inputErrorClass, this._errorClass);
				this._toggleButtonState(formElement, inputList, this._submitButtonSelector, this._inactiveButtonClass);
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
		_hideInputError(inputElement, errorElement, inputErrorClass, errorClass){
			inputElement.classList.remove(inputErrorClass);
			errorElement.classList.remove(errorClass);
			errorElement.textContent = '';
		};

		//Функция проверяет валидность поля
		_checkInputValidity(inputElement, inputErrorClass, errorClass){
			const errorElement = inputElement.nextElementSibling;
			if (!inputElement.validity.valid) {
				this._showInputError(inputElement, errorElement, inputErrorClass, errorClass);
			} else {
				this._hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
			}
		};

		// Проверяет валидность полей и возвращает true Или false. На основе hasInvalidInput кнопка toggleButtonState меняет свое состояние
		_hasInvalidInput(inputList){
			// проходим по этому массиву методом some
			return inputList.some((inputElement) => {
				// Если поле не валидно, колбэк вернёт true
				// Обход массива прекратится и вся фунцкция
				// hasInvalidInput вернёт true
				return !inputElement.validity.valid;
			})
		};

		// Выключение кнопки
		_disableSubmitButton(buttonElement, inactiveButtonClass, inactive){
			if (inactive) {
				buttonElement.setAttribute("disabled", "disabled");
				buttonElement.classList.add(inactiveButtonClass);
			} else {
				buttonElement.removeAttribute('disabled');
				buttonElement.classList.remove(inactiveButtonClass);
			}
		};

		// Включение кнопки submit и переключение ее состояния
		_toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass){
			const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
			const inactive = true;
			if (this._hasInvalidInput(inputList)) {
				this._disableSubmitButton(buttonElement, inactiveButtonClass, inactive);
			} else {
				this._disableSubmitButton(buttonElement, inactiveButtonClass, !inactive);
			}
		}
};