import { sessionController } from '../session/sessionController.js';
import { adListController } from './adListController.js';
import { categoriesListController } from '../categories-list/categoriesListController.js';

const sessionNav = document.getElementById('session');
const listCategoriasUl = document.getElementById('listCategorias');
const listTransaccionesUl = document.getElementById('transacciones');
const botonAtrasDOM = document.querySelector('#atras');
const informacionPaginaDOM = document.querySelector('#informacion-pagina');
const botonSiguienteDOM = document.querySelector('#siguiente');

const searchInput = document.getElementById('searchInput');
const searchForm = document.querySelector('.search-bar');

let paginaActual = 1;
const baseDeDatos = [];
const categoriasSeleccionadas = [];
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
  sessionController(sessionNav);

  window.addEventListener('offline', () => {
    printNotification('error', 'Se ha perdido la conexión');
  });

  const anunciosDiv = document.getElementById('row');

  adListController(anunciosDiv);
  categoriesListController(listCategoriasUl);

  searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    searchTerm = searchInput.value.trim();
    await adListController(anunciosDiv, searchTerm, categoriasSeleccionadas);
  });

  //document.getElementById('listCategorias')
  listCategoriasUl.addEventListener('click', async event => {
    if (event.target.classList.contains('categoria-link')) {
      event.preventDefault();
      const categoriaSeleccionada = event.target.textContent.trim();
      const isSelected = categoriasSeleccionadas.includes(
        categoriaSeleccionada,
      );

      if (isSelected) {
        const index = categoriasSeleccionadas.indexOf(categoriaSeleccionada);
        if (index > -1) {
          categoriasSeleccionadas.splice(index, 1);
        }
        event.target.classList.remove('active');
      } else {
        categoriasSeleccionadas.push(categoriaSeleccionada);
        event.target.classList.add('active');
      }
      await adListController(anunciosDiv, searchTerm, categoriasSeleccionadas);
    }
  });
  listTransaccionesUl.addEventListener('click', async event => {
    if (event.target.classList.contains('transaccion-link')) {
      event.preventDefault();
    }
  });
});
