import { notificationController } from '../tools/notifications/notificationController.js';
import { handleImageUpload } from '../tools/handleImageUpload.js';
import {
  createCategoriesOptions,
  selectOptions,
} from '../tools/selectOptions.js';

import { loadInfoToEdit } from './actualizarAnuncioController.js';

const params = new URLSearchParams(window.location.search);
const adId = params.get('id');
const token = localStorage.getItem('token');
const tagsSelect = document.getElementById('tags');

if (!token) {
  window.location = '../index.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  const adUpdate = document.querySelector('#adForm');
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
  adUpdate.addEventListener('adUpdate', event => {
    printNotification(event.detail.notificationType, event.detail.message);
  });
  adUpdate.addEventListener('adLoadError', event => {
    printNotification(event.detail.notificationType, event.detail.message);
  });
  imageInput.addEventListener('change', handleImageUpload);

  await createCategoriesOptions(tagsSelect);
  selectOptions();

  loadInfoToEdit(adId, adUpdate);
});
