import { perfilCabeceraController } from './perfilCabeceraController.js';
import { notificationController } from '../tools/notifications/notificationController.js';
import { closeByButtonController } from '../tools/notifications/closeByButton.js';

const urlParams = new URLSearchParams(window.location.search);
const usuarioFromUrl = urlParams.get('user');
document.getElementById('usuario').textContent = usuarioFromUrl;

document.addEventListener('DOMContentLoaded', () => {
  const perfilCabecera = document.querySelector('#perfil');
  perfilCabeceraController(perfilCabecera, usuarioFromUrl);
  const notificationSection = document.querySelector('#notification');
  const printNotification = notificationController(notificationSection);

  perfilCabecera.addEventListener('userUpdate', event => {
    printNotification(event.detail.notificationType, event.detail.message);
    closeByButtonController(notificationSection);
  });
});
