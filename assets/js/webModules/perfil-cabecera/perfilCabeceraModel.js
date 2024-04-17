import { apiRest } from '../tools/apiRest.js';

export const getUsuario = async usuario => {
  const endpoint = `final-project/auth/usuarioPorApodo/${usuario}`;

  return await apiRest().getUser(endpoint);
};

export const actualizarUsuario = async formData => {
  const endpoint = `final-project/auth/actualizarUsuario`;

  const body = {
    nombre: formData.querySelector('#nombre').value,
    apellidos: formData.querySelector('#apellidos').value,
    email: formData.querySelector('#emailUser').value,
    apodo: formData.querySelector('#apodo').value,
    fechaNacimiento: formData.querySelector('#fechaNacimiento').value,
    notificacion: formData.querySelector('#notificaciones').value,
  };

  return await apiRest().putUsuario(endpoint, body);
};

export const bajaUsuario = async apodo => {
  const endpoint = `final-project/auth/bajaUsuario`;

  const body = {
    apodo: apodo,
  };

  return await apiRest().deleteUsuario(endpoint, body);
};
