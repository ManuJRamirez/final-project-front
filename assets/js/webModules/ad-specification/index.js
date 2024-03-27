import { notificationController } from '../tools/notifications/notificationsController.js';
import { adSpecificationController } from './adSpecificationController.js';
import { closeByButtonController } from '../tools/notifications/closeByButton.js';
import { sessionController } from '../session/sessionController.js';

const sessionNav = document.getElementById('session');

let slideIndex = 0;

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
  adSpecificationController(adInfoSection, adId).then(() => {
    document.getElementById('prevButton').addEventListener("click", function() {
      cambiarSlide(-1);
    });
    
    document.getElementById('nextButton').addEventListener("click", function() {
      cambiarSlide(1);
    });
  });

  function cambiarSlide(n) {
    const slides = document.getElementsByClassName("carousel-item");
    slideIndex += n;
    
    if (slideIndex >= slides.length) {
      slideIndex = 0;
    }
    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    
    slides[slideIndex].style.display = "block";
  }
});
