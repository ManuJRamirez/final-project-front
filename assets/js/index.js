import { sessionController } from '../../assets/js/webModules/session/sessionController.js';

const sessionNav = document.getElementById('session');

document.addEventListener('DOMContentLoaded', () => {
  sessionController(sessionNav);
});

window.addEventListener('offline', () => {
  printNotification('error', 'Se ha perdido la conexión');
});
