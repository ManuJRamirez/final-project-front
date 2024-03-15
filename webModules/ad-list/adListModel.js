import { sparrestApi } from "../tools/sparrestApi.js";

export const getAdverts = async () => {
    const endpoint = "api/commercial";

    return await sparrestApi().get(endpoint);
}