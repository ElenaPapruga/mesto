// import { Card } from './scr';
import Card from './Card.js';

export default class FormValidator {
	constructor(validationConfig, formElement) {
		this._inputSelector = config.inputSelector;
		this._formSelector = config.formSelector;
		this._submitButtonSelector = config.submitButtonSelector;
		this._inactiveButtonClass = config.inactiveButtonClass;
		this._inputErrorClass = config.inputErrorClass;
		this._errorClass = config.errorClass;

		this._validationConfig = validationConfig;
		this._formElement = formElement;
		this._bottonElement = this.formElement.querySelector(
			this._validationConfig.submitButtonSelector
		);
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._validationConfig.inputSelector)
		);
	}
}

// Показывает элемент ошибки
_showInputError = (inputElement, errorElement) => {
	inputElement.classList.add(this._inputErrorClass);
	errorElement.textContent = inputElement.validationMessage;
	errorElement.classList.add(this._errorClass);

};

// Скрывает элемент ошибки
_hideInputError = (inputElement) => {
	inputElement.classList.remove(this._inputErrorClass);
	errorElement.classList.remove(this._errorClass);
	errorElement.textContent = '';
};

//Функция проверяет валидность поля
_checkInputValidity = (inputElement) => {
	const errorElement = inputElement.nextElementSibling;
	if (!inputElement.validity.valid) {
		this._showInputError(inputElement);
	} else {
		this._hideInputError(inputElement);
	}
};

// Проверяет валидность полей и возвращает true Или false. На основе hasInvalidInput кнопка toggleButtonState меняет свое состояние
_hasInvalidInput = () => {
	// проходим по этому массиву методом some
	return inputList.some((inputElement) => {
		// Если поле не валидно, колбэк вернёт true
		// Обход массива прекратится и вся фунцкция
		// hasInvalidInput вернёт true
		return !inputElement.validity.valid;
	})
};

//Проверка на пустые поля
_hasNotInvalidInput = () => {
	return this._inputList.every((inputElement) => {
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
_toggleButtonState = () => {
	const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
	const inactive = true;
	if (hasInvalidInput(inputList)) {
		disableSubmitButton(buttonElement, inactiveButtonClass, inactive);
	} else {
		disableSubmitButton(buttonElement, inactiveButtonClass, !inactive);
	}
}

// Примет параметры элемент формы и добавит полям нужные обработчики (слушатель событий)
_setEventListeners = () => {

	// Нашли все поля внутри формы. Сделаем из них массив
	// const inputList = Array.from(formElement.querySelectorAll(inputSelector));
	this._inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			this._checkInputValidity(inputElement, inputErrorClass, errorClass);
			this._toggleButtonState();
		});
	});
};

// Найдет и переберет все формы на странице
_enableValidation = (config) => {
	const formList = document.querySelectorAll(config.formSelector);
	formList.forEach((formElement) => {
		this._setEventListeners();
	});
};

