import { loginController } from './loginController.js';
import { notificationController } from "../tools/notifications/notificationController.js";

const loginFormData = document.querySelector('#login');
const passwordRecoveryButton = document.getElementById('passwordRecovery');
const notificationSection = document.querySelector('#notification');
const printNotification = notificationController(notificationSection);


document.addEventListener('DOMContentLoaded', () => {

  loginFormData.addEventListener('loginNotification', (event) =>{
    printNotification(event.detail.notificationType, event.detail.message);
  });

  loginController(loginFormData);

  passwordRecoveryButton.addEventListener('click', () => {
    window.location.href = './passwordRecovery.html';
  });


});
