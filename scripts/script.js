let openPopupBotton = document.querySelector('.popup_opened');

let popup = document.querySelector('.popup');

let editButton = document.getElementById('profile__button');

let closePopupBotton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let formSubmitBotton = document.querySelector('.popup__button');
let popupName = document.querySelector('.popup__field-name');
let popupJob = document.querySelector('.popup__field-job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openProfile() {
    popup.classList.add('popup_opened');
    popupName.value = '';
    popupJob.value = '';
};

function closeProfile() {
    popup.classList.remove('popup_opened');
};

function formSubmit(event) {
    event.preventDefault();
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    closeProfile();
};

editButton.addEventListener('click', openProfile);
closePopupBotton.addEventListener('click', closeProfile);

form.addEventListener('submit', formSubmit);