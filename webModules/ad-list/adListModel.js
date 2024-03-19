import { apiRest } from '../tools/apiRest.js';

export const getAdverts = async () => {
  const endpoint = 'final-project/public/anuncios';

  return await apiRest().get(endpoint);
};
