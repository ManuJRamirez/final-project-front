import { loginAccount } from './loginModel.js';
import { printEvent } from '../tools/printEvent.js';

export const loginController = loginFormData => {
  const loginButton = document.getElementById('loginButton');

  loginFormData.addEventListener('submit', event => {
    loginButton.disabled = true;
    submitLogin(event, loginFormData);
  });
};

const getLoginData = loginFormData => {
  const formData = new FormData(loginFormData);
  const apodo = formData.get('username');
  const password = formData.get('password');

  return {
    apodo: apodo,
    password: password,
  };
};

const submitLogin = async (event, loginFormData) => {
  event.preventDefault();
  const { apodo, password } = getLoginData(loginFormData);

  try {
    printEvent('printLoadLogin', null, loginFormData);
    const jsonWebToken = await loginAccount(apodo, password);
    localStorage.setItem('token', jsonWebToken);
    printEvent(
      'loginNotification',
      {
        notificationType: 'success',
        message: 'Te has conectado correctamente',
      },
      loginFormData,
    );
    setTimeout(() => {
      window.location = './index.html';
    }, 2000);
  } catch (error) {
    printEvent(
      'loginNotification',
      {
        notificationType: 'error',
        message: 'Error al intentar conectar. Pruebe de nuevo',
      },
      loginFormData,
    );
    loginButton.disabled = false;
  } finally {
    printEvent('hideLoadLogin', null, loginFormData);
  }
};
