import { misChatsController } from './misChatsController.js';
import { sessionController } from '../session/sessionController.js';

const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '/login.html';
}

const enviarMensajeFormData = document.querySelector('#enviarMensajeForm');
const sessionNav = document.getElementById('session');

document.addEventListener('DOMContentLoaded', () => {
  sessionController(sessionNav);
  misChatsController(enviarMensajeFormData);
});
