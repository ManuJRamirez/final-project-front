export const closeByButtonController = (notificationSection) => {
    const closeNotificationByButton = document.querySelector('#close');
    closeNotificationByButton.addEventListener('click', () => {
        notificationSection.innerHTML = '';
    });
}