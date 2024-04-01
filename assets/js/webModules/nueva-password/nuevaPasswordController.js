import { printEvent } from '../tools/printEvent.js';
import { nuevaPassword } from './nuevaPasswordModel.js';

export const nuevaPasswordController = nuevaPasswordFormData => {
  const nuevaButton = document.getElementById('nuevaButton');
  const nuevaPasswordInput =
    nuevaPasswordFormData.querySelector('#nuevaPassword');
  const repitePasswordInput =
    nuevaPasswordFormData.querySelector('#repitePassword');

  nuevaPasswordInput.addEventListener('input', function (event) {
    event.preventDefault();
    const errorDiv = document.getElementById('error-div');
    errorDiv.style.display = 'none';

    const errorMessage = document.getElementById('password-error');
    if (
      !nuevaPasswordInput.validity.valid &&
      (!errorMessage || errorMessage.style.display === 'none')
    ) {
      errorDiv.style.display = 'inline-block';
    }
    const errorDivRep = document.getElementById('error-div-rep');
    if (repitePasswordInput.value !== nuevaPasswordInput.value) {
      errorDivRep.style.display = 'inline-block';
    }
  });

  repitePasswordInput.addEventListener('input', function (event) {
    event.preventDefault();
    const errorDiv = document.getElementById('error-div-rep');
    errorDiv.style.display = 'none';

    if (repitePasswordInput.value !== nuevaPasswordInput.value) {
      errorDiv.style.display = 'inline-block';
    }
  });

  nuevaPasswordFormData.addEventListener('submit', event => {
    event.preventDefault();

    const errorMessage = nuevaPasswordFormData.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }

    if (
      nuevaPasswordInput.checkValidity() &&
      repitePasswordInput.value === nuevaPasswordInput.value
    ) {
      nuevaButton.disabled = true;
      submitNuevaPassword(event, nuevaPasswordFormData);
    }
  });
};

const getNuevaPassword = nuevaPasswordFormData => {
  const formData = new FormData(nuevaPasswordFormData);
  const password = formData.get('password');

  return {
    password: password,
  };
};

const submitNuevaPassword = async (event, nuevaPasswordFormData) => {
  event.preventDefault();
  const password = getNuevaPassword(nuevaPasswordFormData);

  try {
    await nuevaPassword(password);

    printEvent(
      'passwordNotification',
      {
        notificationType: 'success',
        message: 'Se ha actualizado correctamente',
      },
      nuevaPasswordFormData,
    );
    setTimeout(() => {
      window.location = './login.html';
    }, 2000);
  } catch (error) {
    if (error instanceof SyntaxError) {
      printEvent(
        'passwordNotification',
        {
          notificationType: 'error',
          message: 'Error al intentar conectar. Pruebe de nuevo',
        },
        nuevaPasswordFormData,
      );
    } else {
      const errorMessage = error || 'Error desconocido';
      printEvent(
        'passwordNotification',
        {
          notificationType: 'error',
          message: errorMessage,
        },
        nuevaPasswordFormData,
      );
    }
    nuevaButton.disabled = false;
  }
};
