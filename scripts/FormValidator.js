export class FormValidator {
	constructor(submitButtonSelector, formSelector) {
		this._formSelector = '.popup__form';
		this._inputSelector = '.popup__input';
		this._submitButtonSelector = document.querySelector(submitButtonSelector);
		this._inactiveButtonClass = 'popup__button_invalid';
		this._inputErrorClass = 'popup__input_type_error';
		this._errorClass = 'popup__error_visible';
		this._inputList = Array.from(formSelector);
	}

	// Найдет и переберет все формы на странице
	enableValidation(){
		this._setEventListeners();
	};
			
	// Примет параметры элемент формы и добавит полям нужные обработчики (слушатель событий)
	_setEventListeners(){

	// Нашли все поля внутри формы. Сделаем из них массив
	this._inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement, this._inputErrorClass, this._errorClass);
				this._toggleButtonState(this._submitButtonSelector, this._inputList, this._inactiveButtonClass);
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

		// Включение кнопки submit и переключение ее состояния
		_toggleButtonState(buttonElement, inputList, inactiveButtonClass){
			if (this._hasInvalidInput(inputList)) {
				buttonElement.setAttribute("disabled", "disabled");
				buttonElement.classList.add(inactiveButtonClass);
			} else {
				buttonElement.removeAttribute('disabled');
				buttonElement.classList.remove(inactiveButtonClass);
			}
		}
};