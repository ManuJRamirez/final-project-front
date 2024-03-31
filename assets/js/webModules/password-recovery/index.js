import { passwordRecoveryController } from "./passwordRecoveryController.js";
import { notificationController } from "../tools/notifications/notificationController.js";

const enviarEmailFormData = document.querySelector('#enviarEmail');
const notificationSection = document.querySelector('#notification');
const printNotification = notificationController(notificationSection);

document.addEventListener('DOMContentLoaded', () => {

  enviarEmailFormData.addEventListener('emailNotification', (event) =>{
    printNotification(event.detail.notificationType, event.detail.message);
});

  passwordRecoveryController(enviarEmailFormData);
});
