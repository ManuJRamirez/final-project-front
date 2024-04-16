import { misChatsController } from './misChatsController.js';
import { sessionController } from '../session/sessionController.js';

const enviarMensajeFormData = document.querySelector('#enviarMensajeForm');
const sessionNav = document.getElementById('session');

document.addEventListener('DOMContentLoaded', () => {
  sessionController(sessionNav);
  misChatsController(enviarMensajeFormData);
});
