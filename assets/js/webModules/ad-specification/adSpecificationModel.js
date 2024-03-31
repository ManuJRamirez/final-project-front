import { apiRest } from '../tools/apiRest.js';

export const getOneAd = async adId => {
  const endpoint = `final-project/public/anuncio/${adId}`;

  return await apiRest().get(endpoint);
};

export const deleteOneAd = async adId => {
  const endpoint = `final-project/auth/borraranuncio/${adId}`;

  await apiRest().delete(endpoint);
};
