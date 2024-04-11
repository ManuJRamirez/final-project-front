import { menuLoggedSession, menuUnloggedSession } from './sessionView.js';

export const sessionController = nav => {
  if (isAccountLoggedIn()) {
    nav.innerHTML = menuLoggedSession();
    const logoutButtons = nav.querySelectorAll('#logoutButton');
    logoutButtons.forEach(button => {
      button.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location = './index.html';
      });
    });
  }
  if (!isAccountLoggedIn()) {
    nav.innerHTML = menuUnloggedSession();
  }
};

const isAccountLoggedIn = () => {
  return localStorage.getItem('token');
};
