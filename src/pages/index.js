import '../pages/index.css';

import { Api } from '../components/Api.js';

import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

import { editForm } from '../utils/constants.js';
import { addElementForm } from '../utils/constants.js';
import { avatarElementForm } from '../utils/constants.js';

import { submitButtonSelector } from '../utils/constants.js';
import { inactiveButtonClass } from '../utils/constants.js';

import { editButton } from '../utils/constants.js';
import { addButton } from '../utils/constants.js';
import { avatarButton } from '../utils/constants.js';
import { editProfileClosePopupButton } from '../utils/constants.js';
import { addElementClosePopupButton } from '../utils/constants.js';
import { avatarElementClosePopupButton } from '../utils/constants.js';
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
import { popupButtonSelectorAvatar } from '../utils/constants.js';
import { popupPhotosSelector } from '../utils/constants.js';
import { popupSettings } from '../utils/constants.js';
import { popupDelete } from '../utils/constants.js';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-29',
    headers: {
        authorization: '6440d2a2-97b2-4d97-9fb2-e93abc9f0dd7',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo()
    .then(data => {
        const { name, about, avatar } = data;
        profileName.textContent = name;
        profileJob.textContent = about;
        profileAvatar.src = avatar;
    })
    .catch((err) => {
        console.error(`Ошибка загрузки начальных данных. Ошибка: ${err}.`);
    });
//id пользователя
let userId = null

let cardsArr = [];
let cardsList = {};

//Изначальная отрисовка данных о пользователе
api.getInitialCards()
    .then((data) => {
        console.log(`Информация получена с сервера.`);
        userId = userInfo._id
        //Создадим массив из карточек из итогового массива
        cardsArr = data.map(serverItem => {
            return {
                name: serverItem.name,
                link: serverItem.link
            };
        })

        const createCard = (param) => {
            const card = new Card(param, '.element-template_type_default', {
                handleCardClick: () => { photoPopup.open(param); }
            });
            return card;
        }
        // Вставляем карточки в разметку
        cardsList = new Section({
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
        console.log(`Ошибка загрузки начальных данных. Ошибка: ${err}.`);
        cardsArr = initialCards;
    });

// const createCard = (param) => {
//     const card = new Card({
//         data,
//         currentUserId: userId,
//         templateSelector: placesConfig.templateSelector,
//         handleLike: (card) => {
//             api
//                 .updateCardLike(card.getId(), !card.isLiked())
//                 .then(data => card.setLikes(data.likes))
//                 .catch(err => console.log(`Не удалось изменить состояние лайка карточки. Ошибка: ${err}`))
//         },
//         handleRemove: (card) => {
//             removeCardPopup.open()
//             removeCardPopup.setSubmitHandler(() => {
//                 renderLoading(removeCardPopup, true, 'Да', 'Удаление...')

//                 api
//                     .removeCard(card.getId())
//                     .then(() => {
//                         card.remove()
//                         removeCardPopup.close()
//                     })
//                     .catch(err => console.log(`Не удалось удалить карточку: ${err}`))
//                     .finally(() => {
//                         renderLoading(removeCardPopup, false, 'Да', 'Удаление...')
//                     })
//             })
//         },
//     })

//     cardsArr = initialCards;
// }

const renderLoading = (popup, isLoading = false, title = 'Сохранить', loadingTitle = 'Загрузка...') => {
    const button = popup.querySelector('.popup__button')

    button.textContent = isLoading ? loadingTitle : title
}

//Создание экземпляра профиля
const userInfo = new UserInfo({ profileName, profileJob });

//Создание экземпляра попапа большой картинки
const photoPopup = new PopupWithImage(popupPhotosSelector);
photoPopup.setEventListeners();

const popupWithAddForm = new PopupWithForm('.popup_type_add-element', {
    submit: (data) => {
        renderLoading(newCardPopup, true, 'Создать', 'Создание...')

        api
            .addCard(data)
            .then(data => {
                cardsList.addItem(cardElement(data))
                popupWithAddForm.close()
            })
            .catch(err => console.log(`Не удалось сохранить карточку. Ошибка:${err}`))
            .finally(() => {
                renderLoading(postNewCard, false, 'Создать', 'Создание...')
            })
    }
})

// // Новая карточка
// const popupWithAddForm = new PopupWithForm('.popup_type_add-element', {
//     submit: (data) => {
//         api.postNewCard({
//             name: data['text-place'],
//             link: data['text-link']
//         })
//             .then(() => {
//                 popupWithAddForm.close();
//             })
//             .catch(err => console.log(`Ошибка при добавлении карточки. Ошибка: ${err}`));
//     }
// })

popupWithAddForm.setEventListeners();

addButton.addEventListener('click', () => {
    popupWithAddForm.open();
})

addElementClosePopupButton.addEventListener('click', () => {
    popupWithAddForm.close();
})

const popupWithInfoForm = new PopupWithForm('.popup_type_edit-profile', {
    submit: (data) => {
        api.setUserInfo({
            name: data['text-name'],
            about: data['text-about']
        })
            .then((info) => {
                userInfo.setUserInfo({
                    name: info.name,
                    about: info.about
                });
                profileName.textContent = popupName.value;
                profileJob.textContent = popupJob.value;
                popupWithInfoForm.close();
            })
            .catch(err => console.log(`Ошибка при обновлении информации о пользователе. Ошибка: ${err}`));
    }
});

popupWithInfoForm.setEventListeners();

// Закрытие формы редактирования профиля
editProfileClosePopupButton.addEventListener('click', () => {
    popupWithInfoForm.close();
});

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    popupWithInfoForm.open();
});

// Изменение аватара
const popupChangeAvatar = new PopupWithForm('.popup_type_avatar', {
    submit: (data) => {
        console.log('data', data)
        api.setAvatar({
            avatar: data['text-link']
        })
            .then((info) => {
                console.log('info', info)
                userInfo.setUserInfo({
                    avatar: info.avatar,
                });
                profileAvatar.src = info.avatar;
                popupChangeAvatar.close();
            })
            .catch(err => console.log(`Ошибка при изменении аватара пользователя. Ошибка: ${err}`));
    }
});

popupChangeAvatar.setEventListeners();

avatarButton.addEventListener('click', () => {
    popupChangeAvatar.open();
});

avatarElementClosePopupButton.addEventListener('click', () => {
    popupChangeAvatar.close();
});

imageClosePopupButton.addEventListener('click', () => {
    photoPopup.close();
})

// Валидация формы добавления новой карточки
const formAddValidator = new FormValidator(popupSettings, addElementForm, popupButtonSelectorAdd);
formAddValidator.enableValidation();

// Валидация формы добавления информации о пользователе
const formEditValidator = new FormValidator(popupSettings, editForm, popupButtonSelectorEdit);
formEditValidator.enableValidation();

// Валидация формы добавления фото нового автара
const formAvatarValidator = new FormValidator(popupSettings, avatarElementForm, popupButtonSelectorAvatar);
formAvatarValidator.enableValidation();