import { notificationController } from '../tools/notifications/notificationController.js';
import { signupController } from './signupController.js';
import { closeByButtonController } from '../tools/notifications/closeByButton.js';

const signupData = document.querySelector('#adForm');
const notificationSection = document.querySelector('#notification');

const printNotification = notificationController(notificationSection);

document.addEventListener('DOMContentLoaded', () => {
  signupData.addEventListener('accountCreated', event => {
    printNotification(event.detail.notificationType, event.detail.message);
    closeByButtonController(notificationSection);
  });

  signupController(signupData);
});
