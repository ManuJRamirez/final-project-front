import { sessionController } from "./webModules/session/sessionController.js";
import { adListController } from "./webModules/ad-list/adListController.js";
import { notificationController } from "./webModules/tools/notifications/notificationsController.js";
import { loaderController } from "./webModules/tools/loader/loaderController.js";
import { closeByButtonController } from "./webModules/tools/notifications/closeByButton.js"

const sessionNav = document.getElementById('session');
const adList = document.getElementById('advertisement');
const notificationSection = document.querySelector('#notification');
const printNotification = notificationController(notificationSection);
const loaderSection = document.querySelector('#loader');
const { printLoader, hideLoader } = loaderController(loaderSection);


document.addEventListener('DOMContentLoaded', () => {
    
    adList.addEventListener('advertListLoaded', (event) =>{
        printNotification(event.detail.notificationType, event.detail.message)
        closeByButtonController(notificationSection);
    });

    adList.addEventListener('adListEmpty', (event) =>{
        printNotification(event.detail.notificationType, event.detail.message)
        closeByButtonController(notificationSection);
    });
    
    adList.addEventListener('loadingListAdvs', () => {
        printLoader();
    })
    
    adList.addEventListener('loadingListAdvsOver', () => {
        hideLoader();
    })
    
    
    sessionController(sessionNav);
    
    adListController(adList);
})

window.addEventListener('offline', () =>{
    printNotification('error', 'Se ha perdido la conexión');
});