import { apiRest } from '../tools/apiRest.js';

export const createrAccount = async (email, password) => {
  const endpoint = 'auth/signup';

  const data = {
    nombre: nombre,
    apellidos: apellidos,
    fechaNacimiento: fechaNacimiento,
    email: email,
    contrasenia: password,
    notificacion: notificacion,
    imgPerfil: imgPerfil,
  };

  await apiRest().createAcc(endpoint, data);
};
