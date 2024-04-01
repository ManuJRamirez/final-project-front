import {
  postAdController,
  loadInfoToEdit,
  createCategoriesOptions,
  selectOptions,
  handleImageUpload,
} from './postAdController.js';
import { notificationController } from '../tools/notifications/notificationController.js';

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
  const notificationSection = document.querySelector('#notification');
  const printNotification = notificationController(notificationSection);

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

  uploadImageButton.addEventListener('click', event => {
    event.preventDefault();
    imageInput.click();
  });

  adCreation.addEventListener('adCreation', event => {
    printNotification(event.detail.notificationType, event.detail.message);
  });

  imageInput.addEventListener('change', handleImageUpload);

  createCategoriesOptions(tagsSelect);
  selectOptions();
  postAdController(adCreation, adId);

  loadInfoToEdit(adInfo, adCreation);
});
