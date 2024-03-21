import { createNotification } from "./notificationView.js";

export const notificationController = (notifications) => {

    const printNotification = (notificationType, message) => {
        notifications.innerHTML = createNotification(notificationType, message);
        setTimeout (() => {
            notifications.innerHTML = '';
        }, 3000);
    }
    return printNotification;
}
