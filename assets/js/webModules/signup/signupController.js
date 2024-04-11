import { printEvent } from '../tools/printEvent.js';
import { createrAccount } from './signupModel.js';

export const signupController = signupData => {
  const signupButton = document.getElementById('signupButton');

  signupData.addEventListener('submit', event => {
    signupButton.disabled = true;
    dataChecking(event, signupData);
  });
};

const dataChecking = async (event, signupData) => {
  event.preventDefault();

  const signUpFormData = new FormData(signupData);
  const email = signupData.querySelector('#email');
  const password = signupData.querySelector('#password');
  const passwordConfirmation = signupData.querySelector(
    '#passwordConfirmation',
  );

  try {
    if (isDataOk(email, password, passwordConfirmation)) {
      await createrAccount(signUpFormData);
      printEvent(
        'accountCreated',
        {
          notificationType: 'success',
          message:
            'Cuenta registrada correctamente <br> Redirigiendo hacia Login...',
        },
        signupData,
      );
      setTimeout(() => {
        window.location = '../login.html';
      }, 3000);
    }
  } catch (error) {
    printEvent(
      'accountCreated',
      { notificationType: 'error', message: error },
      signupData,
    );
    signupButton.disabled = false;
  }
};

export const isEmailOk = email => {
  const emailRegExp = new RegExp(
    // /^((?!\\.)[\\w\\-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$/,
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
  );
  let result = true;

  if (!emailRegExp.test(email.value)) {
    throw 'Introduzca un correo electrónico correcto';
  }
  return result;
};

export const isPasswordOk = (password, passwordConfirmation) => {
  const passwordRegExp = new RegExp(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.,!-_?]).{6,}$/,
    // /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.,!-_?])(?=\\S+$).{6,}$/,
  );
  let result = true;

  if (!passwordRegExp.test(password.value)) {
    throw 'Introduzca una contraseña correcta (min:6 caract,  1 letra, 1 letra mayúsculas, 1 número, 1 signo, sin espacios)';
  }

  if (password.value !== passwordConfirmation.value) {
    throw 'Las contraseñas no son iguales';
  }
  return result;
};

const isDataOk = (email, password, passwordConfirmation) => {
  return isEmailOk(email) && isPasswordOk(password, passwordConfirmation);
};
