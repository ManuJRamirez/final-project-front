import { apiRest } from '../tools/apiRest.js';

export const getOneAd = async adId => {
  const endpoint = `final-project/public/anuncio/${adId}`;

  return await apiRest().get(endpoint);
};

export const deleteOneAd = async adId => {
  const endpoint = `api/commercial/${adId}`;

  await apiRest().delete(endpoint);
};
