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



// Открытие/закрытие попапа 
function togglePopup(windowElement) {
    windowElement.classList.toggle('popup_opened');
    
    if(windowElement.classList.contains('popup_opened')){
        windowElement.addEventListener('mousedown', function (evt) {
            if (evt.target.classList.contains('popup_opened')) {
                evt.target.classList.remove('popup_opened');
            }
        })
    }    
}

//Форма edit
function submitFormAdd(event) {
    event.preventDefault();
    popupPlace.value = '';
    popupLink.value = '';
    togglePopup(popupEditProfile);
}

function submitFormEdit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    togglePopup(popupEditProfile);
}

//Форма add
function submitFormAdd(event) {
    event.preventDefault();
    renderCard({ name: popupPlace.value, link: popupLink.value });
    togglePopup(popupAddElement);
    popupPlace.value = '';
    popupLink.value = '';
}

editButton.addEventListener('click', () => {
    togglePopup(popupEditProfile);
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
});

editProfileClosePopupButton.addEventListener('click', () => {
    togglePopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
    togglePopup(popupAddElement);
});

addElementClosePopupButton.addEventListener('click', () => {
    togglePopup(popupAddElement);
});

editForm.addEventListener('submit', submitFormEdit);
addElementForm.addEventListener('submit', submitFormAdd);

imageClosePopupButton.addEventListener('click', () => {
    togglePopup(popupImage);
});

function createCard(data) {
    const cardElement = elementTemplate.cloneNode(true);
    const elementPhoto = cardElement.querySelector('.element__photo');
    const elementTitle = cardElement.querySelector('.element__title');
    const elementDeleteButton = cardElement.querySelector('.element__delete-button');
    const elementHeart = cardElement.querySelector('.element__heart');

    elementPhoto.addEventListener('click', (event) => {
        togglePopup(popupImage);
        popupModalImage.src = event.target.src;
        popupModalImage.alt = 'Большое фото';
        popupModalTitle.textContent = event.target.nextElementSibling.firstElementChild.textContent;
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

