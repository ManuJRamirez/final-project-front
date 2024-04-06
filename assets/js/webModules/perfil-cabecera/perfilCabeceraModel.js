import { apiRest } from '../tools/apiRest.js';

export const getUsuario = async usuario => {
  const endpoint = `final-project/public/usuario/${usuario}`;

  return await apiRest().getUsuario(endpoint);
};
