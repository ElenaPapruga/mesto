import { initialCards } from './initialcards.js';
import Card from './Card.js';
import { FormValidator } from './FormValidator.js'

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Wrappers
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const editForm = popupEditProfile.querySelector('.popup__form');
const addElementForm = document.querySelector('.popup__form-add');

//Buttoms and other DOM elements
const editButton = document.getElementById('profile__button');
const addButton = document.getElementById('profile__add-button');

const editProfileClosePopupButton = popupEditProfile.querySelector('.popup__close'); // Кнопка закрытия popup edit-profile
const addElementClosePopupButton = popupAddElement.querySelector('.popup__close-add'); //Кнопка закрытия popup add-element

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Form data
const popupName = document.querySelector('.popup__input_type_name');
const popupJob = document.querySelector('.popup__input_type_job');

const popupPlace = document.querySelector('.popup__input_type_place');
const popupLink = document.querySelector('.popup__input_type_link');
const elementCard = document.querySelector('.elements');

const pageElements = document.querySelector('.page__elements');

// закрытие Esc
function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// закрытие по оверлею
function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

// Открытие попапа 
function openedPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closeByEsc);
    popup.addEventListener('mousedown', closeByOverlayClick);
}

// Закрытие попапа 
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEsc);
    popup.removeEventListener('mousedown', closeByOverlayClick);
}

//Форма Edit
function submitFormEdit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup(popupEditProfile);
}

editButton.addEventListener('click', () => {
    openedPopup(popupEditProfile);
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
});

editProfileClosePopupButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

//Форма Add
const submitFormAdd = (evt) => {
    evt.preventDefault();
    const cardElement = renderCard({
        name: popupPlace.value,
        link: popupLink.value
    });
    elementCard.prepend(cardElement);
    closePopup(popupAddElement);

}

addButton.addEventListener('click', () => {
    openedPopup(popupAddElement);
});

addElementClosePopupButton.addEventListener('click', () => {
    closePopup(popupAddElement);
});

const setFormsEventListeners = () => {
    editForm.addEventListener('submit', submitFormEdit);
    addElementForm.addEventListener('submit', submitFormAdd);
}

const renderCard = (data) => {
    const card = new Card(data, '.element-template_type_default');
    const cardElement = card.generateCard();
    return cardElement;
}

initialCards.forEach(data => {
    const cardElement = renderCard(data);
    pageElements.prepend(cardElement);
})

setFormsEventListeners();

const formValidator = new FormValidator(validationSettings);