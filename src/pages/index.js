import '../pages/index.css';

import { initialCards } from '../utils/initialcards.js';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { editForm } from '../utils/constants.js';
import { addElementForm } from '../utils/constants.js';

import { editButton } from '../utils/constants.js';
import { addButton } from '../utils/constants.js';
import { editProfileClosePopupButton } from '../utils/constants.js';
import { addElementClosePopupButton } from '../utils/constants.js';
import { imageClosePopupButton } from '../utils/constants.js';
import { profileName } from '../utils/constants.js';
import { profileJob } from '../utils/constants.js';

import { popupName } from '../utils/constants.js';
import { popupJob } from '../utils/constants.js';
import { popupPlace } from '../utils/constants.js';
import { popupLink } from '../utils/constants.js';
import { elementCard } from '../utils/constants.js';
import { popupButtonSelectorAdd } from '../utils/constants.js';
import { popupButtonSelectorEdit } from '../utils/constants.js';
import { popupPhotosSelector } from '../utils/constants.js';
import { popupSettings } from '../utils/constants.js';

const userInfo = new UserInfo({ profileName, profileJob });

const photoPopup = new PopupWithImage(popupPhotosSelector);


photoPopup.setEventListeners();

const createCard = (data) => {
    const card = new Card(data, '.element-template_type_default', {
        handleCardClick: () => {
            photoPopup.open(data);
        }
    });
    return card;
}
const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = createCard(data)
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement);
    }
},
    elementCard);

cardsList.renderItems();
const popupWithAddForm = new PopupWithForm('.popup_type_add-element', {
    submit: (data) => {
        const card = createCard(data);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'prepend');
    }
})

const popupWithInfoForm = new PopupWithForm('.popup_type_edit-profile', {
    submit: (data) => {
        userInfo.setUserInfo(data);
    }
})

popupWithAddForm.setEventListeners();
popupWithInfoForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithAddForm.open();
})

addElementClosePopupButton.addEventListener('click', () => {
    popupWithAddForm.close();
})

editProfileClosePopupButton.addEventListener('click', () => {
    popupWithInfoForm.close();
})

imageClosePopupButton.addEventListener('click', () => {
    photoPopup.close();
})

editButton.addEventListener('click', () => {
    const userData = userInfo.getUserInfo();
    popupName.value = userData.name;
    popupJob.value = userData.caption;
    popupWithInfoForm.open();
})

//Форма Edit
function submitFormEdit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
}

popupButtonSelectorEdit.addEventListener('click', (event) => {
    submitFormEdit(event);
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    popupWithInfoForm.close();
});

//Форма Add
const submitFormAdd = (event) => {
    event.preventDefault();

    const card = createCard({
        name: popupPlace.value,
        link: popupLink.value
    });

    const cardElement = card.generateCard();
    cardsList.addItem(cardElement, 'prepend');
    popupWithAddForm.close();
}

popupButtonSelectorAdd.addEventListener('click', (event) => {
    submitFormAdd(event)
});

const setFormsEventListeners = () => {
    editForm.addEventListener('submit', submitFormEdit);
    addElementForm.addEventListener('submit', submitFormAdd);
}

setFormsEventListeners();

const formAddValidator = new FormValidator(popupSettings, addElementForm, popupButtonSelectorAdd);

formAddValidator.enableValidation();

const formEditValidator = new FormValidator(popupSettings, editForm, popupButtonSelectorEdit);

formEditValidator.enableValidation();








