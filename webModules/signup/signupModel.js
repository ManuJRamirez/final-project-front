import { sparrestApi } from "../tools/sparrestApi.js";

export const createrAccount = async (email, password) => {
    const endpoint = "auth/register";

    const data = {
        username : email,
        password : password,
    }

    await sparrestApi().createAcc(endpoint,data);
}