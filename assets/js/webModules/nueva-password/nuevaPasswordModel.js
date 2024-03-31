import { apiRest } from '../tools/apiRest.js';

export const nuevaPassword = async (password) => {
  const endpoint = 'final-project/auth/nuevapassword';

  const data = password;

  return await apiRest().postAuthUrl(endpoint, data);
};
