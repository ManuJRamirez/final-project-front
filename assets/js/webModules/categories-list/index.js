import { categoriesListController } from './categoriesListController.js';

const listCategoriasUl = document.getElementById('listCategorias');

document.addEventListener('DOMContentLoaded', () => {
  categoriesListController(listCategoriasUl);
});

window.addEventListener('offline', () => {
  printNotification('error', 'Se ha perdido la conexión');
});
