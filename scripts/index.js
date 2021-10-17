import { initialCards } from './initialcards.js';
import Card from './Card.js';
import { FormValidator } from './FormValidator.js'


//Wrappers
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const editForm = document.querySelector('.popup__form-edit');
const addElementForm = document.querySelector('.popup__form-add');
const popupImage = document.querySelector('.popup_type_image');

//Buttoms and other DOM elements
const editButton = document.getElementById('profile__button');
const addButton = document.getElementById('profile__add-button');

const editProfileClosePopupButton = popupEditProfile.querySelector('.popup__close'); // Кнопка закрытия popup edit-profile
const addElementClosePopupButton = popupAddElement.querySelector('.popup__close-add'); //Кнопка закрытия popup add-element
const closeButton = document.querySelector('.popup__delete-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Form data
const popupName = document.querySelector('.popup__input_type_name');
const popupJob = document.querySelector('.popup__input_type_job');

const popupPlace = document.querySelector('.popup__input_type_place');
const popupLink = document.querySelector('.popup__input_type_link');
const elementCard = document.querySelector('.elements');

const pageElements = document.querySelector('.page__elements');

const popupButtonSelectorAdd = '.popup__button-add';

const popupSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-add',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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
        closePopup(event.target);
    }
}

// Открытие попапа 
export function openedPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', closeByEsc);
    popup.addEventListener('mousedown', closeByOverlayClick);
}

// Закрытие попапа 
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', closeByEsc);
    popup.removeEventListener('mousedown', closeByOverlayClick);
}

//Форма с картинкой
closeButton.addEventListener('click', () => {
    closePopup(popupImage);
});


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
const submitFormAdd = (event) => {
    event.preventDefault();
    const cardElement = renderCard({
        name: popupPlace.value,
        link: popupLink.value
    });

    popupPlace.value = '';
    popupLink.value = '';

    elementCard.prepend(cardElement);
    closePopup(popupAddElement);
    //Устранила ошибку. Код написан в другом месте
}

addButton.addEventListener('click', () => {
    openedPopup(popupAddElement);
    formAddValidator.buttonDisabled();
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

const formAddValidator = new FormValidator(popupSettings, addElementForm);

formAddValidator.enableValidation();

const formEditValidator = new FormValidator(popupSettings, editForm);

formEditValidator.enableValidation();