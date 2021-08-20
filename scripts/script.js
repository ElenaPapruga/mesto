//Код для попапа (не отправляет данные на сервер)
let popup = document.querySelector('.popup');
let editButton = document.getElementById('profile__button');
let closePopupBotton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let popupName = document.querySelector('.popup__input_type_name');
let popupJob = document.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

function submitForm(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closePopup();
};

editButton.addEventListener('click', openPopup);
closePopupBotton.addEventListener('click', closePopup);

form.addEventListener('submit', submitForm);