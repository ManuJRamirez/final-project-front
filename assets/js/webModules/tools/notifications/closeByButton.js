export const closeByButtonController = notificationSection => {
  const closeNotificationByButton = document.querySelector('#closeBtn');
  closeNotificationByButton.addEventListener('click', () => {
    notificationSection.innerHTML = '';
  });
};
