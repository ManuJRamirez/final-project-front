import { sessionController } from '../session/sessionController.js';
import { adListController } from './adListController.js';

const sessionNav = document.getElementById('session');
const anunciosDiv = document.getElementById('row');

document.addEventListener('DOMContentLoaded', () => {
  sessionController(sessionNav);
  adListController(anunciosDiv);
});

window.addEventListener('offline', () => {
  printNotification('error', 'Se ha perdido la conexión');
});
