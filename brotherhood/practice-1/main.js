//Open and Close Modal Window
// document.addEventListener('click', function(event) {
//   console.log(event);
// });
const modalWindow = document.querySelector('.modal');
const openModalButton = document.querySelector('.open-modal__btn');
const closeModalButton = document.querySelector('.form__cancel-btn');
const submitModalbutton = document.querySelector('.form');

openModalButton.addEventListener('click', () => {
	modalWindow.style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
	modalWindow.style.display = 'none';
});

submitModalbutton.addEventListener('submit', (event) => {
	event.preventDefault(); // Эта строка для красивой демонстрации модального окна. В рабочем коде она не нужна.
	modalWindow.style.display = 'none';
});

//Activity Selection 
const selectedActivity = document.querySelector('.activity_selected');
const ownActivity = document.querySelector('.activity_own');

selectedActivity.addEventListener('change', () => {
  if (selectedActivity.value === 'own-variant') {
    ownActivity.style.display = 'block';
	  ownActivity.focus();
  } else {
    ownActivity.style.display = 'none';
  }
});

//Logo Uploader
const input = document.querySelector('#logo');
const preview = document.querySelector('.upload-preview');

preview.style.backgroundImage = `url(../src/defaultImage.jpg)`;

input.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', function() {
    preview.style.backgroundImage = `url(${this.result})`;
  });
	reader.readAsDataURL(file);
});

//Logo Delete Button
const deleteBtn = document.querySelector('.form-logo__delete-image-btn');

deleteBtn.addEventListener('click', () => {
  preview.style.backgroundImage = 'none';
  input.value = '';
});


