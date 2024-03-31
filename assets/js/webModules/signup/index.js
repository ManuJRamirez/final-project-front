import { loaderController } from "../tools/loader/loaderController.js";
import { notificationController } from "../tools/notifications/notificationController.js";
import { signupController } from "./signupController.js";
import { closeByButtonController } from "../tools/notifications/closeByButton.js"


const signupData = document.querySelector('#signup');
const notificationSection = document.querySelector('#notification')
const loaderSection = document.querySelector('#loader')
const printNotification = notificationController(notificationSection);
const { printLoader, hideLoader } = loaderController(loaderSection);

document.addEventListener('DOMContentLoaded', () => {

    signupData.addEventListener('accountCreated', (event) =>{
        printNotification(event.detail.notificationType, event.detail.message)
        closeByButtonController(notificationSection);
    });

    signupData.addEventListener('printLoadSignup', () =>{
        printLoader();
    });

    signupData.addEventListener('hideLoadSignup', () => {
        hideLoader();
    });

    signupController(signupData);
});
