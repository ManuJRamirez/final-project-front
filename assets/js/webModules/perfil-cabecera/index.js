import { perfilCabeceraController } from './perfilCabeceraController.js';

const urlParams = new URLSearchParams(window.location.search);
const usuarioFromUrl = urlParams.get('user');
document.getElementById('usuario').textContent = usuarioFromUrl;
const perfilCabecera = document.getElementById('perfil');

document.addEventListener('DOMContentLoaded', () => {
  perfilCabeceraController(perfilCabecera, usuarioFromUrl);
});
