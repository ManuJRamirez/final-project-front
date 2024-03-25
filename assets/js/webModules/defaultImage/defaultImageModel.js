import { apiRest } from '../tools/apiRest.js';

export const getDefaultImage = async () => {
  const endpoint = 'final-project/auth/defaultimage';

  return await apiRest().get(endpoint);
};
