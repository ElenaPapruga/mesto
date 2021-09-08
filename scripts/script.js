//Wrappers
let popupEditProfile = document.querySelector('.popup_type_edit-profile');
let popupAddElement = document.querySelector('.popup_type_add-element');
let popupImage = document.querySelector('.popup_type_image');
let popupClose = document.querySelector('.popup__delete-button');
let editForm = popupEditProfile.querySelector('.popup__form');
let addElementForm = document.querySelector('.popup__form-add');

//Buttoms and other DOM elements
let editButton = document.getElementById('profile__button');
let addButton = document.getElementById('profile__add-button');

let editProfileClosePopupButton = popupEditProfile.querySelector('.popup__close');
let addElementClosePopupButton = popupAddElement.querySelector('.popup__close-add');
let imageClosePopupButton = popupImage.querySelector('.element__delete-button');   /***/

let elementLike = document.querySelector('.element__heart');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

//Form data
let popupName = document.querySelector('.popup__input_type_name');
let popupJob = document.querySelector('.popup__input_type_job');

let popupPlace = document.querySelector('.popup__input_type_place');
let popupLink = document.querySelector('.popup__input_type_link');

let popupModalImage = document.querySelector('.popup__image');
let popupModalTitle = document.querySelector('.popup__title-image');

function openPopup(windowElement) {
    if (!windowElement.classList.contains('popup_type_edit-profile')) {
        popupPlace.value = popupModalTitle.textContent;
        popupLink.value = popupModalImage.src;
    }

    windowElement.classList.toggle('popup_opened');
};


//Форма edit
function submitForm(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    openPopup(popupEditProfile);
};


//Форма add
function submitFormAdd(event) {
    event.preventDefault();
    renderCard({ name: popupPlace.value, link: popupLink.value });
    openPopup(popupAddElement);
};

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile)
});

editProfileClosePopupButton.addEventListener('click', () => {
    openPopup(popupEditProfile)
});

addButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});

addElementClosePopupButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});



editForm.addEventListener('submit', submitForm);
addElementForm.addEventListener('submit', submitFormAdd);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

let elementTemplate = document.querySelector('.element-template').content.querySelector('.element__card');
const elementCard = document.querySelector('.elements');

popupClose.addEventListener('click', () => {
    openPopup(popupImage);
});


function createCard(data) {
    let cardElement = elementTemplate.cloneNode(true);
    let elementPhoto = cardElement.querySelector('.element__photo');
    let elementTitle = cardElement.querySelector('.element__title');
    let elementDeleteButton = cardElement.querySelector('.element__delete-button');
    let elementHeart = cardElement.querySelector('.element__heart');

    elementPhoto.addEventListener('click', (event) => {
        openPopup(popupImage);
        popupModalImage.src = event.target.src;
        popupModalTitle.textContent = event.target.nextElementSibling.firstElementChild.textContent;
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
    elementCard.prepend(cardElement);
    return cardElement;
}

function renderCard(data) {
    elementCard.prepend(createCard(data));
}

initialCards.forEach((data) => {
    renderCard(data)
})