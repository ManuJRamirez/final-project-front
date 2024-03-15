import { sparrestApi } from "../tools/sparrestApi.js";

export const getOneAd = async (adId) => {
    const endpoint = `api/commercial/${adId}?_expand=user`;

    return await sparrestApi().get(endpoint);
};

export const deleteOneAd = async (adId) => {
    const endpoint = `api/commercial/${adId}`;

    await sparrestApi().delete(endpoint);
};



