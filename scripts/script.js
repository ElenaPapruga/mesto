//Wrappers
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddElement = document.querySelector('.popup_type_add-element');
const popupImage = document.querySelector('.popup_type_image');
const editForm = popupEditProfile.querySelector('.popup__form');
const addElementForm = document.querySelector('.popup__form-add');

//Buttoms and other DOM elements
const editButton = document.getElementById('profile__button');
const addButton = document.getElementById('profile__add-button');

const editProfileClosePopupButton = popupEditProfile.querySelector('.popup__close'); // Кнопка закрытия popup edit-profile
const addElementClosePopupButton = popupAddElement.querySelector('.popup__close-add'); //Кнопка закрытия popup add-element
const elementTemplateDeleteButton = document.querySelector('.element__delete-button'); //Кнопка закрытия Template
const imageClosePopupButton = document.querySelector('.popup__delete-button'); // Кнопка закрытия popup image

const elementLike = document.querySelector('.element__heart');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Form data
const popupName = document.querySelector('.popup__input_type_name');
const popupJob = document.querySelector('.popup__input_type_job');

const popupPlace = document.querySelector('.popup__input_type_place');
const popupLink = document.querySelector('.popup__input_type_link');

const popupModalImage = document.querySelector('.popup__image');
const popupModalTitle = document.querySelector('.popup__title-image');

const elementTemplate = document.querySelector('.element-template').content.querySelector('.element__card');
const elementCard = document.querySelector('.elements');

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



function submitFormEdit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup(popupEditProfile);
}

//Форма add
function submitFormAdd(event) {
    event.preventDefault();
    renderCard({ name: popupPlace.value, link: popupLink.value });
    closePopup(popupAddElement);
    popupPlace.value = '';
    popupLink.value = '';
}

editButton.addEventListener('click', () => {
    openedPopup(popupEditProfile);
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
});

editProfileClosePopupButton.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
    openedPopup(popupAddElement);
});

addElementClosePopupButton.addEventListener('click', () => {
    closePopup(popupAddElement);
});

editForm.addEventListener('submit', submitFormEdit);
addElementForm.addEventListener('submit', submitFormAdd);

imageClosePopupButton.addEventListener('click', () => {
    closePopup(popupImage);
});

function createCard(data) {
    const cardElement = elementTemplate.cloneNode(true);
    const elementPhoto = cardElement.querySelector('.element__photo');
    const elementTitle = cardElement.querySelector('.element__title');
    const elementDeleteButton = cardElement.querySelector('.element__delete-button');
    const elementHeart = cardElement.querySelector('.element__heart');

    elementPhoto.addEventListener('click', (event) => {
        openedPopup(popupImage);
        popupModalImage.src = event.target.src;
        popupModalImage.alt = 'Большое фото';
        popupModalTitle.textContent = data.name;
        console.log(popupModalImage.alt);
    });

    elementHeart.addEventListener('click', (event) => {
        event.preventDefault();
        event.target.classList.toggle('element__heart_active');
    });

    elementDeleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.target.closest('.element__card').remove();
    });

    elementTitle.textContent = data.name;
    elementPhoto.alt = 'Фото';
    elementPhoto.src = data.link;
    return cardElement;
}

function renderCard(data) {
    elementCard.prepend(createCard(data));
}

initialCards.forEach((data) => {
    renderCard(data)
});


// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_invalid',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});