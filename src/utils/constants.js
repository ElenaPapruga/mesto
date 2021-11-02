// Используется при валидации форм
export const popupForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitBtnSelector: '.popup__button_valid',
    errorClass: '.error',
};

export const imageData = {
    imageSelector: '.popup__image',
    captionSelector: '.popup__title-image',
};

export const likeCard = (card) => {
    const id = card.getCardId();
    const user = userProfile.getUserID();
    const likeState = card.isLiked();
    const action = likeState ? 'удалить' : 'поставить';
    const likeFunc = likeState ? id => api.unlikeCard(id) : id => api.likeCard(id);
};
    //Wrappers
    export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
    export const popupAddElement = document.querySelector('.popup_type_add-element');
    export const editForm = document.querySelector('.popup__form-edit');
    export const addElementForm = document.querySelector('.popup__form-add');

    //Buttoms and other DOM elements
    export const editButton = document.getElementById('profile__button');
    export const addButton = document.getElementById('profile__add-button');
    export const avatarButton = document.getElementById('profile__avatar__btn');
    

    export const editProfileClosePopupButton = popupEditProfile.querySelector('.popup__close'); // Кнопка закрытия popup edit-profile
    export const addElementClosePopupButton = popupAddElement.querySelector('.popup__close-add'); //Кнопка закрытия popup add-element
    export const imageClosePopupButton = document.querySelector('.popup__delete-button');

    export const profileName = document.querySelector('.profile__title');
    export const profileJob = document.querySelector('.profile__subtitle');
    export const profileAvatar = document.querySelector('.profile__avatar');

    //Form data
    export const popupName = document.querySelector('.popup__input_type_name');
    export const popupJob = document.querySelector('.popup__input_type_job');

    export const popupPlace = document.querySelector('.popup__input_type_place');
    export const popupLink = document.querySelector('.popup__input_type_link');
    export const elementCard = '.elements';

    export const popupButtonSelectorAdd = document.querySelector('.popup__button-add');
    export const popupButtonSelectorEdit = document.querySelector('.popup__button-edit');

    export const popupPhotosSelector = '.popup_type_image';

    export const popupSettings = {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        inactiveButtonClass: 'popup__button_invalid',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
    };

    export const popupData = {
        closePopup: '.popup__btn_action_close',
        openedClass: 'popup_opened',
    }

    export const initialCards = [
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
    