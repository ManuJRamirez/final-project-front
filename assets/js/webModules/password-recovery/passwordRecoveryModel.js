import { apiRest } from '../tools/apiRest.js';

export const enviarEmail = async (email) => {
  const endpoint = 'final-project/public/enviarEmailRecuperacion';

  const data = {
    email: email,
  };

  return await apiRest().post(endpoint, data);
};

