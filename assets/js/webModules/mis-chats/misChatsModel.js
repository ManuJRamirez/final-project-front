import { apiRest } from '../tools/apiRest.js';

export const getChats = async () => {
  const endpoint = `final-project/auth/misChats`;

  return await apiRest().getChats(endpoint);
};