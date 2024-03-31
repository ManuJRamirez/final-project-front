import { nuevaPasswordController } from "./nuevaPasswordController.js";
import { notificationController } from "../tools/notifications/notificationController.js";

const nuevaPasswordFormData = document.querySelector('#nuevaPasswordForm');
const notificationSection = document.querySelector('#notification');
const printNotification = notificationController(notificationSection);

document.addEventListener('DOMContentLoaded', () => {

  nuevaPasswordFormData.addEventListener('passwordNotification', (event) =>{
    printNotification(event.detail.notificationType, event.detail.message);
});

nuevaPasswordController(nuevaPasswordFormData);
});
