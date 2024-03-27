import {
  postAdController,
  loadInfoToEdit,
  createCategoriesOptions,
  selectOptions,
  handleImageUpload,
} from './postAdController.js';

const token = localStorage.getItem('token');
const adInfo = localStorage.getItem('infoAd');
const adId = localStorage.getItem('adId');
const tagsSelect = document.getElementById('tags');

if (!token) {
  window.location = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const adCreation = document.querySelector('#adForm');
  const precioInput = document.getElementById('precio');

  precioInput.addEventListener('keypress', function (event) {
    if ((event.key === '-') | (event.key === '+')) {
      event.preventDefault();
    }
  });
  document.getElementById('precio').addEventListener('input', function () {
    let value = this.value;

    let decimalIndex = value.indexOf('.');
    if (decimalIndex !== -1 && value.length - decimalIndex > 3) {
      this.value = parseFloat(value).toFixed(2);
    }
  });

  const imageInput = document.getElementById('imageInput');
  const uploadImageButton = document.getElementById('uploadImageButton');

  // Listener para el botón "Subir Imágenes"
  uploadImageButton.addEventListener('click', event => {
    event.preventDefault();
    imageInput.click();
  });

  // Listener para el cambio en el input file
  imageInput.addEventListener('change', handleImageUpload);

  createCategoriesOptions(tagsSelect);
  postAdController(adCreation, adId);

  loadInfoToEdit(adInfo, adCreation);
  selectOptions();
});
