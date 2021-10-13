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

// закрытие Esc
function closeByEsc(event) {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopup(openedPopup);
    }
}

// закрытие по оверлею
function closeByOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
        const openedPopup = document.querySelector('.popup_opened');
        togglePopup(openedPopup);
    }
}

export function togglePopup(popup) {
    popup && popup.classList.toggle('popup_opened');
    document.addEventListener('keyup', closeByEsc);
    popup && popup.addEventListener('mousedown', closeByOverlayClick);
}

//Форма с картинкой
closeButton.addEventListener('click', () => {
    togglePopup(popupImage);
});


//Форма Edit
function submitFormEdit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    togglePopup(popupEditProfile);
}

editButton.addEventListener('click', () => {
    togglePopup(popupEditProfile);
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
});

editProfileClosePopupButton.addEventListener('click', () => {
    togglePopup(popupEditProfile);
});

//Форма Add
const submitFormAdd = (evt) => {
    evt.preventDefault();
    const cardElement = renderCard({
        name: popupPlace.value,
        link: popupLink.value
    });
    elementCard.prepend(cardElement);
    togglePopup(popupAddElement);
}

addButton.addEventListener('click', () => {
    togglePopup(popupAddElement);
});

addElementClosePopupButton.addEventListener('click', () => {
    togglePopup(popupAddElement);
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

const formAddValidator = new FormValidator(
    '.popup__button-add',
    addElementForm,
);

formAddValidator.enableValidation();

const formEditValidator = new FormValidator(
    '.popup__button-edit',
    editForm
);

formEditValidator.enableValidation();