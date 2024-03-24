import {
  postAdController,
  loadInfoToEdit,
  createCategoriesOptions,
  selectOptions,
  imagenes,
} from './postAdController.js';

const token = localStorage.getItem('token');
const adInfo = localStorage.getItem('infoAd');
const adId = localStorage.getItem('adId');
const tagsSelect = document.getElementById('tags');
const images = document.getElementById('imageInput');

if (!token) {
  window.location = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const adCreation = document.querySelector('#adForm');
  const precioInput = document.getElementById('precio');
  precioInput.addEventListener('keypress', function (event) {
    if ((event.key === '.') | (event.key === '-') | (event.key === '+')) {
      event.preventDefault();
    }
  });

  imagenes(images);
  createCategoriesOptions(tagsSelect);
  postAdController(adCreation, adId);

  loadInfoToEdit(adInfo, adCreation);
  selectOptions();
});
