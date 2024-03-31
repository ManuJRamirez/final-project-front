import { apiRest } from '../tools/apiRest.js';

export const createrAccount = async signupForm => {
  const endpoint = 'final-project/auth/signup';

  const body = {
    apodo: signupForm.get('apodo'),
    contrasenia: signupForm.get('password'),
    email: signupForm.get('email'),
    notificacion: signupForm.get('notificaciones'),
  };

  await apiRest().createAcc(endpoint, body);
};
