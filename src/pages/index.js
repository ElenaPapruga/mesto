import '../pages/index.css';

import { Api } from '../components/Api.js';

import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
//////////////////PopupWithConfirm.js
import { editForm } from '../utils/constants.js';
import { addElementForm } from '../utils/constants.js';

// const formEditProfileSelector = `${popupSelectors.editProfile} ${popupForm.formSelector}`;
// const formChangeAvatarSelector = `${popupSelectors.changeAvatar} ${popupForm.formSelector}`;

// const formEditProfile = document.querySelector(formEditProfileSelector);
// const formEditProfileValidation = new FormValidator(popupForm, formEditProfile);
// const buttonEditProfile = document.querySelector(btnEditProfileSelector);
// const buttonSubmitProfile = formEditProfile.querySelector(popupForm.submitBtnSelector);

// const formChangeAvatar = document.querySelector(formChangeAvatarSelector);
// const formChangeAvatarValidation = new FormValidator(popupForm, formChangeAvatar);
// const buttonChangeAvatar = document.querySelector('.popup__button-avatar');

// const formNewCardSelector = `${popupSelectors.createCard} ${popupForm.formSelector}`;
// const formNewCard = document.querySelector(formNewCardSelector);
// const formNewCardValidation = new FormValidator(validationConfig, formElement, submitButtonSelector);
// const btnNewCard = document.querySelector('.popup__button-add');
// const btnSubmitCard = formNewCard.querySelector(popupForm.submitBtnSelector);

// const buttonSubmitAvatar = formChangeAvatar.querySelector(popupForm.submitBtnSelector);
import { editButton } from '../utils/constants.js';
import { addButton } from '../utils/constants.js';
import { avatarButton } from '../utils/constants.js';
import { editProfileClosePopupButton } from '../utils/constants.js';
import { addElementClosePopupButton } from '../utils/constants.js';
import { imageClosePopupButton } from '../utils/constants.js';
import { profileName } from '../utils/constants.js';
import { profileJob } from '../utils/constants.js';
import { profileAvatar } from '../utils/constants.js';


import { popupName } from '../utils/constants.js';
import { popupJob } from '../utils/constants.js';
import { popupPlace } from '../utils/constants.js';
import { popupLink } from '../utils/constants.js';
import { initialCards } from '../utils/constants.js';
import { elementCard } from '../utils/constants.js';
import { popupButtonSelectorAdd } from '../utils/constants.js';
import { popupButtonSelectorEdit } from '../utils/constants.js';
import { popupPhotosSelector } from '../utils/constants.js';
import { popupSettings } from '../utils/constants.js';

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-29',
    headers: {
        authorization: '6440d2a2-97b2-4d97-9fb2-e93abc9f0dd7',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo()
    .then(data => {
        const {name, about, avatar} = data;
        profileName.textContent = name;
        profileJob.textContent = about;
        profileAvatar.src = avatar;
    })
    .catch((err) => {
        console.error(`Ошибка загрузки начальных данных. ${err}.`);
    });

let cardsArr = [];

api.getInitialCards()
    .then((data) => {
        console.log(`Информация о карточках получена с сервера.`);
        //Создадим массив из карточек из итогового массива
        cardsArr = data.map(serverItem => {
            console.log(serverItem)
            return { 
                name: serverItem.name, 
                link: serverItem.link 
            };
        })

        const createCard = (param) => {
            const card = new Card(param, '.element-template_type_default', {
                handleCardClick: () => {
                    photoPopup.open(param);
                }
            });
            return card;
        }
        
        const cardsList = new Section({
            items: cardsArr,
            renderer: (list) => {
                const card = createCard(list)
                const cardElement = card.generateCard();
                cardsList.addItem(cardElement);
            }
        },
            elementCard);
        
        cardsList.renderItems();

    })
    .catch((err) => {
        console.log(`Ошибка загрузки начальных данных. ${err}.`);
        //Cоздадим массив карточек из массива резерва
        cardsArr = initialCards;
    });

    const userInfo = new UserInfo({ profileName, profileJob });
    const photoPopup = new PopupWithImage(popupPhotosSelector);    
    photoPopup.setEventListeners();  //добавила из popup

    const popupWithAddForm = new PopupWithForm('.popup_type_add-element', {
        submit: (data) => {
            const card = createCard(data);
            const cardElement = card.generateCard();
            cardsList.addItem(cardElement, 'prepend');
            //popupWithAddForm.close()
        }
    })
    
    const popupWithInfoForm = new PopupWithForm('.popup_type_edit-profile', {
        submit: (data) => {
            userInfo.setUserInfo(data);
            //popupWithInfoForm.close();
        }
    })

    const popupChangeAvatar = new PopupWithForm('.popup_type_avatar', {
        submit: (data) => {
            userInfo.setUserInfo(data);
            //popupWithInfoForm.close();
        }
    })
    
    popupWithAddForm.setEventListeners();  //добавила из popup
    popupWithInfoForm.setEventListeners();  //добавила из popup
    popupChangeAvatar.setEventListeners();
    
    addButton.addEventListener('click', () => {
        popupWithAddForm.open();
    })

    avatarButton.addEventListener('click', () => {
        console.log('sss')
        popupChangeAvatar.open();
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
    
    // const setFormsEventListeners = () => {
    //     editForm.addEventListener('submit', submitFormEdit);
    //     addElementForm.addEventListener('submit', submitFormAdd);
    // }
    
    // setFormsEventListeners();
    
    // const formAddValidator = new FormValidator(popupSettings, addElementForm, popupButtonSelectorAdd);
    
    // formAddValidator.enableValidation();
    
    // const formEditValidator = new FormValidator(popupSettings, editForm, popupButtonSelectorEdit);
    
    // formEditValidator.enableValidation();



    

    //const popupImage = new PopupWithImage(popupElement, imageElement);
// const photoPopup = new PopupWithImage(popupPhotosSelector);
// const userInfo = new UserInfo({ userNameSelector, userCaptionSelector, userAvatarSelector });









// {
//     elem: data,
//         handleClick: (data) => { popupImage.open(data); },
//             handleLike: (card) => { console.log('Like', { card }); },
//                 handleDelete: (card) => { deleteCard(card); }
//     handleDelete: (card) => { popupConfirm.open(card); }
//     );

    // const btnSubmitDelSelector = `${popupSelectors.confirm} ${popupForm.submitBtnSelector}`;/////
    // const btnSubmitDel = document.querySelector(btnSubmitDelSelector);//////

    // Добавление карточки с фотографией в список
    // const addListItem = function (elem) {
    //     const card = new Card(
    //         {
    //             elem: data,
    //             handleClick: (data) => { popupImage.open(data); },
    //             handleLike: (card) => { console.log('Like', { card }); },

    //             handleDelete: (card) => { popupConfirm.open(card); }
    //         },
    //         cardTemplateSelector,
    //         cardSelector
    //     );
    //     const cardElement = card.createCard(userInfo.getUserID());
    //     container.addItem(cardElement);
    // };

    // // Удаление карточки
    // const deleteCard = (card) => {
    //     btnSubmitDel.textContent = 'Удаление...';
    //     api.deleteCard(card.getCardId())
    //         .then((res) => {
    //             card.delete();
    //         })
    //         .catch((err) => {
    //             console.log(`Невозможно удалить карточку. Ошибка ${err}.`);
    //         })
    //         .finally(() => {

    //             popupConfirm.close();
    //             btnSubmitDel.textContent = 'Да';
    //         });
    // }

    // //--------------------------------------------------------------------------------------
    // // Форма добавления карточки
    // //--------------------------------------------------------------------------------------
    // const popupCard = new PopupWithForm(
    //     popupSelector, handleFormSubmit,
    //     (data) => { saveCard(data); }
    // );

    // const saveCard = function (data) {
    //     btnSubmitCard.textContent = 'Сохранение...';
    //     api.postNewCard({ name: data.title, link: data.link })
    //         .then((res) => {
    //             addListItem({
    //                 title: res.name,
    //                 link: res.link,
    //                 likes: res.likes,
    //                 id: res._id,
    //                 mine: res.mine._id
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(`Невозможно сохранить карточку на сервере. Ошибка ${err}.`);
    //         })
    //         .finally(() => {
    //             popupCard.close();

    //             btnSubmitCard.textContent = 'Создать';
    //         });
    // }

    // //--------------------------------------------------------------------------------------
    // // Редактирование профиля
    // //--------------------------------------------------------------------------------------

    // Окно редактирования аватара пользователя
    // const popupChangeAvatar = new PopupWithForm(
    //     popupSelectors.changeAvatar, popupData, formData,
    //     (data) => { saveUserAvatar(data); }
    // );
    // // Окно редактирования профиля пользователя
    // const popupEditProfile = new PopupWithForm(
    //     popupSelectors.editProfile, popupData, formData,
    //     (data) => { saveUserInfo(data); }
    // );
    // // Сохранение аватара на сервере
    // const saveUserAvatar = function (data) {
    //     buttonSubmitAvatar.textContent = 'Сохранение...';
    //     api.setAvatar(data)
    //         .then((res) => {
    //             userInfo.setUserAvatar(res.avatar);
    //             userInfo.setUserId(res._id);
    //         })
    //         .catch((err) => {
    //             console.log(`Невозможно обновить аватар на сервере. ${err}.`);
    //         })
    //         .finally(() => {
    //             popupChangeAvatar.close();
    //             buttonSubmitAvatar.textContent = 'Сохранить';
    //         });
    // }
    // // Сохранение профиля на сервере
    // const saveUserInfo = function (userData) {
    //     buttonSubmitProfile.textContent = 'Сохранение...';
    //     api.setUserInfo(userData)
    //         .then((res) => {
    //             userInfo.setUserInfo({ name: res.name, about: res.about });
    //             userInfo.setUserId(res._id);
    //         })
    //         .catch((err) => {
    //             console.log(`Невозможно обновить профиль пользователя. ${err}.`);
    //         })
    //         .finally(() => {
    //             popupEditProfile.close();
    //             buttonSubmitProfile.textContent = 'Сохранить';
    //         });
    // }
    // //--------------------------------------------------------------------------------------
    // // Обработка событий
    // popupCard.setEventListeners();
    // popupEditProfile.setEventListeners();
    // popupImage.setEventListeners();
    // popupChangeAvatar.setEventListeners();
    // popupConfirm.setEventListeners();

    // // Включаем валидацию форм
    // formNewCardValidation.enableValidation();
    // formEditProfileValidation.enableValidation();
    // formChangeAvatarValidation.enableValidation();

    // // Нажатие на кнопку "Добавить карточку"
    // btnNewCard.addEventListener('click', () => {
    //     popupCard.open();
    //     formNewCardValidation.setInitialState();
    // });

    // // Нажатие на кнопку "Редактировать профиль"
    // editProfileClosePopupButton.addEventListener('click', () => {
    //     popupEditProfile.open(userInfo.getUserInfo());
    //     formEditProfileValidation.setInitialState();
    // });
    // buttonChangeAvatar.addEventListener('click', () => {
    //     const avatar = userInfo.getUserAvatar()
    //     popupChangeAvatar.open({ avatar });
    //     formChangeAvatarValidation.setInitialState();
    // });
    // //--------------------------------------------------------------------------------------
    // // Получаем данные с сервера
    // let cardsArr = [];
    // let container = null;

    // api.getUserInfo()
    //     .then((res) => {
    //         console.log(`Информация о пользователе получена с сервера.`);
    //         userInfo.setUserInfo({ name: res.name, info: res.about });
    //         userInfo.setUserAvatar(res.avatar);
    //         userInfo.setUserId(res._id);
    //     })
    //     .catch((err) => {
    //         console.log(`Невозможно прочитать профиль пользователя. ${err}.`);
    //     })
    //     .finally(() => {
    //         api.getInitialCards()
    //             .then((res) => {
    //                 console.log(`Информация о карточках получена с сервера.`);
    //                 cardsArr = res.map(data => {
    //                     return {
    //                         title: data.name,
    //                         link: data.link,
    //                         likes: data.likes,
    //                         id: data._id,
    //                         mine: data.mine._id
    //                     };
    //                 });
    //             })

    //             .catch((err) => {
    //                 console.log(`Невозможно получить карточки с сервера. ${err}.`);
    //                 cardsArr = initialCards;
    //             })
    //             .finally(() => {
    //                 container = new Sction(  // Создание контейнера
    //                     { datas: cardsArr, renderer: (data) => addListItem(data) },
    //                     listSelector
    //                 );
    //                 container.renderItems(); // Показ карточек
    //             });
    //     });