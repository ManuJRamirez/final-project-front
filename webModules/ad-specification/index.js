import { loaderController } from "../tools/loader/loaderController.js"
import { notificationController } from "../tools/notifications/notificationsController.js"
import { adSpecificationController } from "./adSpecificationController.js";
import { closeByButtonController } from "../tools/notifications/closeByButton.js"

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const adId = params.get("id");
    const adInfoSection = document.querySelector('#adSpecification');

    const notificationSection = document.querySelector('#notification');
    const printNotification = notificationController(notificationSection);

    const loaderSection = document.querySelector('#loader');
    const { printLoader, hideLoader } = loaderController(loaderSection);

    adInfoSection.addEventListener('oneAdLoading', () => {
        printLoader();
    });
    
    adInfoSection.addEventListener('oneAdDeleteLoading', () => {
        printLoader();
    })

    adInfoSection.addEventListener('oneAdLoadingOver', () => {
        hideLoader();
    });

    adInfoSection.addEventListener('oneAdDeleteLoadingOver', () => {
        hideLoader();
    })

    adInfoSection.addEventListener('oneAdNotification', (event) => {
        printNotification(event.detail.notificationType, event.detail.message);
        closeByButtonController(notificationSection);
    });
    adInfoSection.addEventListener('oneAdDeleted', (event) => {
        printNotification(event.detail.notificationType, event.detail.message);
        closeByButtonController(notificationSection);
    })

    adSpecificationController(adInfoSection, adId);
});
