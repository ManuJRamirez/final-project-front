import { printEvent } from '../tools/printEvent.js';
import { enviarEmail } from './passwordRecoveryModel.js';

export const passwordRecoveryController = (enviarEmailFormData) => {
    
    const enviarEmailButton = document.getElementById('enviarEmailButton');
    const emailInput = enviarEmailFormData.querySelector('#email'); 

    emailInput.addEventListener('input', function(event) {
        event.preventDefault();
        const errorDiv = document.getElementById('email-error-div'); 
        errorDiv.style.display = 'none';
    
        const errorMessage = document.getElementById('email-error');
        if (!emailInput.validity.valid && (!errorMessage || errorMessage.style.display === 'none')) {
            errorDiv.style.display = 'inline-block';
        }
    });

    enviarEmailFormData.addEventListener('submit', event => {
        event.preventDefault();

        const errorMessage = enviarEmailFormData.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }

        if (!emailInput.checkValidity()) {
            return;
        }

        enviarEmailButton.disabled = true;
        submitEnviarEmail(event, enviarEmailFormData);
      });
    
    }

const getEmailData = enviarEmailFormData => {
    const formData = new FormData(enviarEmailFormData);
    const email = formData.get('email');
  
    return {
        email: email,
    };
  };

const submitEnviarEmail = async (event, enviarEmailFormData) => {
    event.preventDefault();
    const { email } = getEmailData(enviarEmailFormData);
  
    try {
        await enviarEmail(email);

        printEvent(
            'emailNotification',
            {
            notificationType: 'success',
            message: 'Se ha enviado correctamente',
            },
            enviarEmailFormData,
        );
        setTimeout(() => {
            window.location = './login.html';
        }, 2000);

    } catch (error) {
        if (error instanceof SyntaxError) {
            printEvent(
                'emailNotification',
                {
                notificationType: 'error',
                message: 'Error al intentar conectar. Pruebe de nuevo',
                },
                enviarEmailFormData,
            );
        } else {
            const errorMessage = error || 'Error desconocido';
            printEvent(
                'emailNotification',
                {
                notificationType: 'error',
                message: errorMessage,
                },
                enviarEmailFormData,
            );
        }
        enviarEmailButton.disabled = false;
    }
};
  