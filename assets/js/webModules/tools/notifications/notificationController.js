import { createNotification } from "./notificationView.js";
import { closeByButtonController } from "./closeByButton.js";

export const notificationController = (notifications) => {

    const printNotification = (notificationType, message) => {
        notifications.innerHTML = createNotification(notificationType, message);
        closeByButtonController(notifications);
        setTimeout (() => {
            notifications.innerHTML = '';
        }, 60000);
    }
    return printNotification;
}
