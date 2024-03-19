import { apiRest } from '../tools/apiRest.js';

export const loginAccount = async (email, password) => {
  const endpoint = 'final-project/auth/signin';

  const data = {
    email: email,
    contrasenia: password,
  };

  return await apiRest().loginAcc(endpoint, data);
};
