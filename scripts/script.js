// Код для попапа (не отправляет данные на сервер)
let popup = document.querySelector('.popup');
let editButton = document.getElementById('profile__button');
let closePopupBotton = document.querySelector('.popup__close');
let form = document.querySelector('.popup__form');
let formSubmitBotton = document.querySelector('.popup__button');
let popupName = document.querySelector('.popup__field_name');
let popupJob = document.querySelector('.popup__field_job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

function openPopup() {
    popup.classList.add('popup_opened');
    form.value = profileName.textContent;
    form.value = profileJob.textContent;
    popupName.value = '';
    popupJob.value = '';
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