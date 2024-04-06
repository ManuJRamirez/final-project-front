import { decodeToken } from '../tools/decodeToken.js';
import { perfilCabeceraView } from './perfilCabeceraView.js';
import { getUsuario } from './perfilCabeceraModel.js';

export const perfilCabeceraController = async (userForm, usuarioFromUrl) => {
  const token = localStorage.getItem('token');

  if (token) {
    const usuarioFromToken = decodeToken(token).sub;

    if (usuarioFromUrl === usuarioFromToken) {
    }
    userForm.innerHTML = perfilCabeceraView();
    const usuarioBBDD = await getUsuario(usuarioFromToken);

    const nombre = usuarioBBDD.nombre;
    const apellidos = usuarioBBDD.apellidos;
    const email = usuarioBBDD.email;
    const apodo = usuarioBBDD.apodo;
    const fechaNacimiento = usuarioBBDD.fechaNacimiento;
    const notificaciones = usuarioBBDD.notificacion;
  }
};
