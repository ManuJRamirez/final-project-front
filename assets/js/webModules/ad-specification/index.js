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

    document.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('buttonImg')) {
        const key = event.target.getAttribute('data-key');
        const imgOriginal = event.target.getAttribute('data-info');

        const popupContainer = event.target.parentElement.querySelector('.popup-container');
        const popupImage = popupContainer.querySelector('.popupImage');
        popupImage.src = 'data:image/png;base64,' + imgOriginal;
        popupContainer.style.display = 'block';
        
        // Cerrar el pop-up al hacer clic en la "X"
        const closeBtn = popupContainer.querySelector('.close');
        closeBtn.addEventListener('click', function() {
          popupContainer.style.display = 'none';
        });
      }
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
