import { apiRest } from '../tools/apiRest.js';

export const getChats = async idAnuncio => {
  const endpoint = `final-project/auth/chatsPorIdAnuncio/${idAnuncio}`;

  return await apiRest().getChats(endpoint);
};