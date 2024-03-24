import { apiRest } from '../tools/apiRest.js';

export const loginAccount = async (apodo, password) => {
  const endpoint = 'final-project/auth/signin';

  const data = {
    apodo: apodo,
    contrasenia: password,
  };

  return await apiRest().loginAcc(endpoint, data);
};
