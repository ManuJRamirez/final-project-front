import { apiRest } from '../tools/apiRest.js';

export const getCategories = async () => {
  const endpoint = 'final-project/public/categorias';

  return await apiRest().get(endpoint);
};
