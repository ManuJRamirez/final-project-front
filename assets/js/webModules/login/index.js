import { loginController } from './loginController.js';

const loginFormData = document.querySelector('#login');
document.addEventListener('DOMContentLoaded', () => {
  loginController(loginFormData);
});
