import { loginController } from './loginController.js';

const loginFormData = document.querySelector('#login');
const passwordRecoveryButton = document.getElementById('passwordRecovery');


document.addEventListener('DOMContentLoaded', () => {
  loginController(loginFormData);

  passwordRecoveryButton.addEventListener('click', () => {
    window.location.href = './passwordRecovery.html';
  });
});
