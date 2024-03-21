import { notificationController } from '../tools/notifications/notificationsController.js';
import { adSpecificationController } from './adSpecificationController.js';
import { closeByButtonController } from '../tools/notifications/closeByButton.js';
import { sessionController } from '../session/sessionController.js';

const sessionNav = document.getElementById('session');

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const adId = params.get('id');
  const adInfoSection = document.querySelector('#adSpecification');

  sessionController(sessionNav);
  const notificationSection = document.querySelector('#notification');
  const printNotification = notificationController(notificationSection);

  adInfoSection.addEventListener('oneAdNotification', event => {
    printNotification(event.detail.notificationType, event.detail.message);
    closeByButtonController(notificationSection);
  });
  adInfoSection.addEventListener('oneAdDeleted', event => {
    printNotification(event.detail.notificationType, event.detail.message);
    closeByButtonController(notificationSection);
  });
  adSpecificationController(adInfoSection, adId);
});
