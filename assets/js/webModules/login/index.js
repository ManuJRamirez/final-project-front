import { loginController } from "./loginController.js";
import { loaderController } from "../tools/loader/loaderController.js"
import { notificationController } from "../tools/notifications/notificationsController.js"
import { closeByButtonController } from "../tools/notifications/closeByButton.js";

const loginFormData = document.querySelector('#login');
const loaderSection = document.querySelector('#loader');
const { printLoader, hideLoader} = loaderController(loaderSection);
const notificationSection = document.querySelector('#notification');
const printNotification = notificationController(notificationSection);
document.addEventListener('DOMContentLoaded', () => {
   
    loginFormData.addEventListener('loginNotification', (event) =>{
        printNotification(event.detail.notificationType, event.detail.message);
        closeByButtonController(notificationSection);
    });

    loginFormData.addEventListener('printLoadLogin', () => {
        printLoader();
    });

    loginFormData.addEventListener('hideLoadLogin', () => {
        hideLoader();
    })



    loginController(loginFormData);

})